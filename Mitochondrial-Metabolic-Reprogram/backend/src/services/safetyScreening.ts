export interface SafetyProfile {
  hasType1Diabetes: boolean
  hasKidneyDisease: boolean
  hasLiverDisease: boolean
  isPregnant: boolean
  currentMedications?: string | null
}

export interface SafetyResult {
  cleared: boolean
  blockers: string[]   // absolute contraindications — protocol should not proceed
  warnings: string[]   // relative — proceed with caution + provider supervision
}

const INSULIN_REQUIRING_MEDS = ['insulin', 'glargine', 'detemir', 'degludec', 'lispro', 'aspart', 'glulisine', 'nph']
const RENAL_ADJUSTED_MEDS = ['metformin', 'sglt2', 'empagliflozin', 'dapagliflozin', 'canagliflozin']

function hasMed(meds: string | null | undefined, keywords: string[]): boolean {
  if (!meds) return false
  const lower = meds.toLowerCase()
  return keywords.some(k => lower.includes(k))
}

export function checkSafety(profile: SafetyProfile): SafetyResult {
  const blockers: string[] = []
  const warnings: string[] = []

  if (profile.hasType1Diabetes) {
    blockers.push(
      'Type 1 diabetes is an absolute contraindication. Therapeutic ketosis can trigger diabetic ketoacidosis (DKA), which is life-threatening. Do not proceed without endocrinologist supervision.'
    )
  }

  if (profile.isPregnant) {
    blockers.push(
      'Pregnancy is an absolute contraindication. Calorie restriction and ketosis are unsafe for fetal development.'
    )
  }

  if (profile.hasKidneyDisease) {
    warnings.push(
      'Chronic kidney disease requires medical supervision. A high-fat diet can worsen renal function. Nephrology clearance recommended before starting the Press phase.'
    )
  }

  if (profile.hasLiverDisease) {
    warnings.push(
      'Liver disease impairs ketone production and fatty acid metabolism. Hepatology clearance recommended before starting the Press phase.'
    )
  }

  if (hasMed(profile.currentMedications, INSULIN_REQUIRING_MEDS)) {
    warnings.push(
      'Insulin or insulin-related medications detected. Carbohydrate restriction significantly alters insulin requirements. Endocrinologist dose adjustment required before starting the protocol.'
    )
  }

  if (hasMed(profile.currentMedications, RENAL_ADJUSTED_MEDS)) {
    warnings.push(
      'Metformin or SGLT-2 inhibitors detected. These medications may interact with ketogenic diets (SGLT2i can cause euglycaemic DKA). Prescriber review required.'
    )
  }

  return {
    cleared: blockers.length === 0,
    blockers,
    warnings,
  }
}

// Biomarker-based alert thresholds — called per-reading
export interface BiomarkerAlert {
  severity: 'warning' | 'urgent'
  message: string
}

export function checkBiomarkerAlerts(params: {
  gkiScore?: number | null
  bloodGlucoseMgdl?: number | null
  betaHydroxybutyrateMmol?: number | null
  altUl?: number | null
  astUl?: number | null
  hasType1Diabetes?: boolean
}): BiomarkerAlert[] {
  const alerts: BiomarkerAlert[] = []

  if (params.bloodGlucoseMgdl != null && params.bloodGlucoseMgdl > 250) {
    alerts.push({ severity: 'urgent', message: 'Blood glucose >250 mg/dL. Seek medical attention immediately.' })
  } else if (params.bloodGlucoseMgdl != null && params.bloodGlucoseMgdl > 180) {
    alerts.push({ severity: 'warning', message: 'Blood glucose >180 mg/dL. Consider reviewing carbohydrate intake.' })
  }

  if (params.betaHydroxybutyrateMmol != null && params.betaHydroxybutyrateMmol > 6) {
    const msg = params.hasType1Diabetes
      ? 'Ketones >6 mmol/L with T1 diabetes. DKA risk — seek emergency medical care immediately.'
      : 'Ketones >6 mmol/L. Very high ketosis — check glucose and consult your provider.'
    alerts.push({ severity: 'urgent', message: msg })
  } else if (params.betaHydroxybutyrateMmol != null && params.betaHydroxybutyrateMmol > 5) {
    alerts.push({ severity: 'warning', message: 'Ketones >5 mmol/L. Above therapeutic range — consider easing the Press phase.' })
  }

  // ALT/AST normal upper limits: ALT ~40 U/L, AST ~35 U/L
  if (params.altUl != null && params.altUl > 120) {
    alerts.push({ severity: 'urgent', message: 'ALT >3× upper limit. Liver stress detected — pause protocol and consult hepatology.' })
  }
  if (params.astUl != null && params.astUl > 105) {
    alerts.push({ severity: 'urgent', message: 'AST >3× upper limit. Liver stress detected — pause protocol and consult hepatology.' })
  }

  return alerts
}
