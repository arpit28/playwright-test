# Playwright Test Automation Framework

A comprehensive test automation framework built with Playwright for both UI and API testing.

## Project Structure
playwright-test/
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── data/                  # Test data and fixtures
├── node_modules/          # Dependencies
├── playwright-report/     # HTML test reports
├── test-results/          # Test execution artifacts
├── tests/
│   ├── api/               # API tests
│   │   └── posts.spec.js
│   └── ui/                # UI tests
│       ├── fileUpload.spec.js
│       ├── login.spec.js
│       └── utils/         # Helper utilities
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependencies
├── playwright.config.js   # Playwright configuration
└── README.md              # Project documentation



## Features

- **UI Testing**: Automated tests for web interfaces - https://the-internet.herokuapp.com/
- **API Testing**: Automated tests for RESTful APIs - https://jsonplaceholder.typicode.com/
- **CI/CD Integration**: GitHub Actions workflow for continuous testing
- **Reporting**: HTML reports for test results visualization


## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm (v10 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/arpit28/playwright-test.git

# Navigate to the project directory
cd playwright-test

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install


# Run all tests
npx playwright test

# Run UI tests only
npx playwright test tests/ui

# Run API tests only
npx playwright test tests/api

# Run tests with UI mode
npx playwright test --ui

# Viewing Reports
npx playwright show-report