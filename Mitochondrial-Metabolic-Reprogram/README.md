# Mitochondrial Metabolic Reprogramming Application

A comprehensive application designed to help individuals implement mitochondrial metabolic reprogramming strategies for improved health and wellness.

## Repository Structure

```
mitochondrial-metabolic-reprogram/
├── backend/                  # Backend server (Node.js/Express)
│   ├── src/                  # Source code
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database models
│   │   ├── utils/            # Utility functions
│   │   └── config/           # Configuration files
│   ├── tests/                # Backend tests
│   ├── package.json          # Backend dependencies
│   └── server.js             # Main server entry point
├── frontend/                 # Frontend client (React)
│   ├── public/               # Static assets
│   │   └── index.html        # HTML template
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service layer
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   ├── styles/           # CSS/styles
│   │   ├── context/          # React context providers
│   │   ├── hooks/            # Custom hooks
│   │   ├── App.js            # Main App component
│   │   └── index.js          # Entry point
│   ├── tests/                # Frontend tests
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend-specific documentation
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── .gitignore                # Git ignore rules
├── README.md                 # Project overview (this file)
└── package.json              # Root package.json (for workspace management)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mitochondrial-metabolic-reprogram
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```

### Environment Variables

Create `.env` files in both backend and frontend directories based on the provided `.env.example` files.

## Features

- User authentication and authorization
- Personalized assessment questionnaires
- Metabolic zone calculation
- Personalized action plan generation
- Progress tracking and visualization
- Educational content library
- Meal planning and recipe suggestions
- Exercise planning and tracking
- Community features (future)
- Healthcare provider portal (future)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
