# WooCommerce Installation and Configuration Guide for Gaming Accessories Store

## Overview
WooCommerce transforms your WordPress site into a fully functional e-commerce store. This guide walks you through installing and configuring WooCommerce for your gaming accessories store.

## Prerequisites
Before installing WooCommerce, ensure you have:
1. A working WordPress installation (version 5.0 or higher)
2. Admin access to your WordPress dashboard
3. A compatible theme (we'll be using Storefront, but WooCommerce works with most themes)
4. PHP version 7.4+ and MySQL 5.6+ (as required by WordPress)
5. Basic understanding of WordPress navigation

## Step 1: Installing WooCommerce via WordPress Plugin Repository (Recommended)

This is the easiest and most reliable method.

### Step-by-Step Instructions:

1. **Log in to your WordPress dashboard**
   - Go to `https://yourstore.com/wp-admin`
   - Enter your username and password

2. **Navigate to the plugin installer**
   - In the left sidebar, click on "Plugins"
   - Then click on "Add New"

3. **Search for WooCommerce**
   - In the search bar at the top right, type "WooCommerce"
   - Look for the official plugin by "Automattic" (the company behind WooCommerce and WordPress.com)

4. **Install the plugin**
   - Click the "Install Now" button next to WooCommerce
   - Wait for the installation to complete (should take a few seconds)

5. **Activate the plugin**
   - After installation, the "Install Now" button will change to "Activate"
   - Click "Activate" to activate WooCommerce

6. **Launch the WooCommerce setup wizard**
   - Upon activation, you should see a welcome notice: "Welcome to WooCommerce! Let's get your store set up."
   - Click the "Run the setup wizard" button
   - If you don't see this notice, you can also find the wizard at: WooCommerce > Help > Setup wizard

## Step 2: Manual Installation (Alternative Method)

Use this method if you cannot install plugins via the WordPress repository (e.g., restricted hosting environment).

### Step-by-Step Instructions:

1. **Download WooCommerce**
   - Go to https://wordpress.org/plugins/woocommerce/
   - Click "Download" to get the latest version as a ZIP file
   - Alternatively, download from the WooCommerce website: https://woocommerce.com/products/woocommerce/

2. **Upload via WordPress**
   - In your WordPress dashboard, go to Plugins > Add New
   - Click the "Upload Plugin" button at the top
   - Click "Choose File" and select the WooCommerce ZIP file you downloaded
   - Click "Install Now"

3. **Activate the plugin**
   - After installation, click "Activate Plugin"

## Step 3: Running the WooCommerce Setup Wizard

The setup wizard guides you through essential store configuration. It's recommended to run it immediately after activation.

### Wizard Page 1: Store Details

1. **Store address**
   - Enter your store's physical address (for tax calculations and shipping origins)
   - This can be your home address or a business address (use what's appropriate and complies with local laws)
   - Street address, apartment/unit, city, state/province, postal/ZIP code, country

2. **Country/region**
   - Already filled based on your address, but verify it's correct

3. **State/province**
   - Already filled based on your address

4. **Postal/ZIP code**
   - Already filled based on your address

5. **Currency**
   - Select the currency you want to use (e.g., USD, EUR, GBP, CAD)
   - This affects how prices are displayed throughout your store

6. **Click "Let's go!"**

### Wizard Page 2: Payment

WooCommerce comes with several payment gateways pre-installed. We'll focus on setting up PayPal (as specified in our plan) and mention other options.

1. **Enable/disable payment methods**
   - Toggle switches for each payment method:
     - Direct bank transfer
     - Check payments
     - Cash on delivery
     - PayPal (we'll configure this in detail)
     - Stripe (requires separate setup, not covered in this basic guide)

2. **Set up PayPal**
   - Click "Set up" next to PayPal
   - You'll need a PayPal Business or Personal account (Business recommended for stores)
   - Enter your PayPal email address
   - Optional: Enable PayPal Pay Later (allows customers to pay in installments)
   - Optional: Enable PayPal Credit (subject to approval)
   - Click "Save payment methods"

   > **Note for Teen Managers**: Involve a parent/guardian in setting up and managing the PayPal account, as it handles real money transactions.

### Wizard Page 3: Shipping

Configure how you'll ship products to customers.

1. **Shipping zone**
   - Click "Add shipping zone"
   - Zone name: e.g., "United States" or "Local"
   - Zone regions: Select the countries/states you want to ship to
   - You can add multiple zones (e.g., one for domestic, one for international)

2. **Add shipping methods**
   - For each zone, click "Add shipping method"
   - Choose from:
     - Flat rate: Fixed cost per shipment (e.g., $5.00)
     - Free shipping: No cost (can set conditions like minimum order amount)
     - Local pickup: Customers pick up in person
   - Configure the method:
     - For Flat rate: Enter the cost, tax status
     - For Free shipping: Set minimum order amount if desired
     - For Local pickup: Enter pickup location details

3. **Shipping options**
   - Choose whether to charge shipping tax
   - Enable debug mode if needed for troubleshooting (leave disabled for production)

4. **Click "Continue"**

### Wizard Page 4: Recommended

This page suggests additional free plugins that can enhance your store.

1. **Recommended plugins**
   - WooCommerce Services: Provides shipping labels, rates, and more (requires Jetpack connection)
   - Storefront: The official WooCommerce theme (we'll install this separately)
   - You can choose to install these now or later
   - For our store, we'll install Storefront as our theme, so you can select it here

2. **Click "Continue with recommended" or "Skip this step"**

### Wizard Page 5: Activate!

1. **Review your choices**
   - The wizard summarizes what you've configured

2. **Click "Create your store" or "Finish"**
   - WooCommerce will save your settings and create essential pages:
     - Shop
     - Cart
     - Checkout
     - My Account

3. **Setup complete!**
   - You'll see a welcome message with links to:
     - Add products
     - Customize your store
     - View WooCommerce documentation

## Step 4: Configuring Basic WooCommerce Settings (Beyond the Wizard)

After the wizard, you may want to fine-tune settings. Access these via WooCommerce > Settings in your WordPress dashboard.

### General Settings
- **Location**: Store address, selling locations (specific countries you sell to)
- **Currency**: Currency options (position, separator, decimal places)
- **Enable taxes**: Toggle tax calculations on/off
- **Enable coupons**: Allow coupon codes (recommended for promotions)
- **Currency converter**: Not needed if you only sell in one currency

### Products Settings
- **General**: Measurements (weight, dimensions), enable reviews, ratings
- **Inventory**: 
  - Manage stock: Enable to track quantities
  - Hold stock: Minutes to hold unpaid orders
  - Notifications: Low stock, out of stock, email recipient
  - Out of stock visibility: Hide or show out of stock items
- **Downloadable products**: Not needed for physical gaming accessories
- **Product CSV Import/Export**: For bulk product management (advanced)
- **Product tags**: Enable tagging products
- **Attributes**: For variable products (size, color, etc.)

### Tax Settings (if applicable)
Consult with a parent/accountant or tax professional for your local tax obligations.
- **Tax options**: Prices entered with/without tax, calculate tax based on
- **Standard rates**: Add your local tax rates (if required)
- **Additional classes**: For reduced or zero-rated items (if applicable)

### Shipping Settings
- **Shipping zones**: Review/edit zones and methods
- **Shipping options**: 
  - Calculate shipping destination based on
  - Shipping calculator: Show on cart page
  - Destination: Ship to billing address only or to shipping address
- **Shipping methods**: Configure each method's details

### Payments Settings
Review and refine payment methods:
- **PayPal**: 
  - Enable/disable PayPal Standard
  - Enter PayPal email
  - Payment action: Authorization vs. Capture
  - Debug log: Enable for troubleshooting (disable in production)
  - Button style: Customize PayPal button appearance
- **Other methods**: Configure as needed

### Accounts & Privacy
- **Account creation**: Allow customers to create accounts during checkout
- **Account deletion**: How long to retain data
- **Personal data**: Options for data export and erasure (for GDPR compliance)
- **Retention guidelines**: How long to keep order data

### Emails
Customize email templates for:
- New order
- Cancelled order
- Failed order
- Order on-hold
- Processing order
- Completed order
- Refunded order
- Customer invoice
- Customer note
- Reset password
- New account
- Customer processing order
- Customer completed order
- You can modify the sender name, email, subject, and heading for each

### API
Enable REST API if needed for integrations (leave disabled if not using)

### Advanced
- **Page setup**: Check that the correct pages are assigned to Cart, Checkout, My Account, Terms and Conditions
- **Endpoints**: Customize URL endpoints for account, order, and view pages (usually leave default)
- **Legacy API**: Enable only if using older integrations
- **REST API**: Enable for mobile apps or custom integrations
- **Webhooks**: For automated actions (advanced)
- **Log files**: Enable for debugging (be mindful of file size)

## Step 5: Verifying WooCommerce Installation

After installation and configuration, verify that WooCommerce is working correctly.

### Check for WooCommerce Pages
WooCommerce should have automatically created these pages:
- **Shop**: Displays your products
- **Cart**: Where customers review items before checkout
- **Checkout**: Where customers enter payment and shipping information
- **My Account**: Where customers view orders and manage their profile

Verify these exist:
1. Go to Pages > All Pages in your WordPress dashboard
2. Look for pages with "Shop", "Cart", "Checkout", "My Account" in the title
3. Visit each page on your site to ensure they load correctly

### Check for WooCommerce Menu Items
In your WordPress dashboard sidebar, you should now see:
- WooCommerce (with sub-items: Orders, Coupons, Reports, Settings, Status, Extensions)
- Products (with sub-items: All Products, Add New, Categories, Tags, Attributes, Inventory)

### Test Adding a Product
1. Go to Products > Add New
2. Enter a test product name (e.g., "Test Controller")
3. Add a description
4. Set a price (e.g., $10.00)
5. In the Product Data section:
   - Leave as "Simple product" (default)
   - Enter SKU (e.g., TEST001)
   - Manage stock: Enable, enter quantity (e.g., 5)
6. Assign to a category (you may need to create a category first, e.g., "Controllers")
7. Add a product image
8. Click "Publish"
9. Visit your Shop page to see the test product
10. Click on the product to view the single product page
11. Click "Add to cart" and verify it works
12. Go to the cart and verify the item appears correctly
13. Proceed to checkout to verify the process starts (you don't need to complete payment for this test)

### Test with Storefront Theme (Optional but Recommended)
If you haven't already, install and activate the Storefront theme:
1. Go to Appearance > Themes > Add New
2. Search for "Storefront"
3. Install and Activate
4. Visit your site to see how it looks with the default WooCommerce styling

### Check Site Health
1. Go to Tools > Site Health
2. Check the Status tab for any critical issues or recommendations
3. Review the Info tab for server configurations

## Step 6: Next Steps After WooCommerce Setup

Once WooCommerce is installed and configured:

1. **Install and Activate Storefront Theme** (refer to the theme installation guide)
2. **Install Essential Plugins** (refer to the essential plugins guide)
   - PayPal for WooCommerce (if not fully configured via wizard, though wizard covers basics)
   - SEO plugin (Yoast SEO or Rank Math)
   - Security plugin (Wordfence or iThemes Security)
   - Contact form plugin (Contact Form 7 or WPForms Lite)
   - Backup plugin (UpdraftPlus or BlogVault)
3. **Add your actual gaming accessories products** (refer to the sample products guide)
4. **Set up navigation menus** (refer to the essential pages guide)
5. **Create essential store pages** (About Us, Contact, FAQ, Policies)
6. **Test the complete purchase process** (refer to the store testing guide)

## Troubleshooting Common WooCommerce Issues

### Issue: "Welcome to WooCommerce" notice not appearing
- **Cause**: Sometimes conflicts with other plugins or themes
- **Solution**: 
  - Go to WooCommerce > Help > Setup wizard to run it manually
  - Temporarily deactivate other plugins to check for conflicts

### Issue: Pages not created automatically
- **Cause**: Permissions or plugin conflict
- **Solution**:
  - Go to WooCommerce > Status > Tools
  - Click "Create pages" under the "Page setup" section
  - Or manually create pages and assign them in WooCommerce > Settings > Advanced > Page setup

### Issue: Checkout page not working or missing fields
- **Cause**: Theme or plugin conflict, JavaScript issues
- **Solution**:
  - Switch to a default theme (like Twenty Twenty-Four) to test
  - Disable plugins one by one to identify conflicts
  - Check browser console for JavaScript errors (F12 > Console tab)

### Issue: Email notifications not sending
- **Cause**: Mail server configuration, plugin conflict
- **Solution**:
  - Check your hosting's email settings
  - Install an SMTP plugin (like WP Mail SMTP) to configure proper email sending
  - Ensure WooCommerce emails are enabled in WooCommerce > Settings > Emails

### Issue: Unable to add products to cart
- **Cause**: JavaScript conflict, caching issue, cookie problems
- **Solution**:
  - Clear browser cache
  - Disable caching plugins temporarily
  - Check for JavaScript errors in browser console
  - Ensure cookies are enabled in browser

## Security Considerations for Your WooCommerce Store

1. **Keep WooCommerce updated**
   - Regularly check for updates in Dashboard > Updates
   - Enable automatic updates for minor releases if comfortable

2. **Secure your PayPal account**
   - Use a strong, unique password
   - Enable two-factor authentication (2FA)
   - Regularly review transaction history

3. **Use HTTPS/SSL**
   - Essential for encrypting data during checkout
   - Most hosts offer free Let's Encrypt certificates

4. **Limit login attempts**
   - Use WooCommerce Settings > Accounts > Login options or a security plugin

5. **Regular backups**
   - Set up automated backups (especially before major updates)
   - Store backups off-site

6. **Monitor for suspicious activity**
   - WooCommerce > Orders: Look for unusually large orders or multiple failed payments
   - Review login attempts if using a security plugin

## Resources for Further Learning

- **WooCommerce Documentation**: https://docs.woocommerce.com/
- **WooCommerce Guides**: https://woocommerce.com/resources/guides/
- **WooCommerce Blog**: https://woocommerce.com/blog/
- **WPBeginner WooCommerce Section**: https://www.wpbeginner.com/woocommerce/
- **YouTube Tutorials**: Search for "WooCommerce tutorial for beginners"

## Notes for Teen Manager (with Parental Guidance)

- Involve a parent/guardian in the setup process, especially when configuring payment methods (PayPal) and tax settings.
- Keep all login credentials (WordPress, hosting, PayPal) secure and consider using a password manager.
- As you become more comfortable, explore WooCommerce extensions that can add functionality (shipping calculators, subscription products, etc.).
- Regularly ask for parental review of your store settings, especially payment, tax, and security configurations.
- Remember that you're handling real money transactions - treat this responsibility with care and follow all applicable laws and regulations.

---
*Guide created: 2026-05-17*
*For: Online Gaming Accessories Store using WordPress/WooCommerce*