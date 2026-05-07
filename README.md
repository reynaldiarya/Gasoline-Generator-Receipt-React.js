# Gasoline Receipt Generator

A professional-grade React application for generating and printing digital gasoline receipts with customizable SPBU configurations.

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/React-19.x-61DAFB.svg" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-38B2AC.svg" />
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://github.com/reynaldiarya/Gasoline-Generator-Receipt-React.js">
    <img src="https://codecov.io/gh/reynaldiarya/Gasoline-Generator-Receipt-React.js/branch/main/graph/badge.svg" />
  </a>
</p>

## Description

The Gasoline Receipt Generator is a specialized web tool designed to streamline the creation of transaction receipts for fuel purchases. It addresses the need for accurate, customizable, and professional-looking receipts for accounting, expense tracking, and personal record-keeping. Built with modern web technologies, the application provides a robust interface for managing gas station profiles and generating high-resolution digital outputs compatible with various printing standards.

## Disclaimer

**EDUCATIONAL PURPOSE ONLY**

This software is developed strictly for educational and developmental purposes to demonstrate modern web application capabilities, state management, and direct browser printing techniques.

**IT IS STRICTLY PROHIBITED TO USE THIS SOFTWARE FOR ANY FRAUDULENT, ILLEGAL, OR SCAM ACTIVITIES.**

The author assumes no responsibility for any misuse of this software. By using this application, you agree to use it responsibly and in accordance with all applicable laws and regulations.

## Features

- **Customizable SPBU Directory** - Store and manage multiple gas station configurations including names, addresses, and unique identifiers
- **Dynamic Transaction Processing** - Input fuel volume, price per liter, and payment details with automatic calculation of totals and taxes
- **Live Preview Engine** - Real-time rendering of receipts to ensure visual accuracy and formatting consistency before final generation
- **High-Fidelity Export** - Integrated with html2canvas-pro to generate clean, high-resolution PNG images optimized for thermal printers
- **Local Persistence** - Built-in Local Storage support ensures that all gas station configurations and preferences remain saved across browser sessions
- **Responsive Design** - A clean, mobile-first interface built with Tailwind CSS 4, offering a seamless user experience on any device

## Tech Stack

- **Frontend Framework**: React 19
- **Routing & Framework**: React Router 7 (v7.15.0)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 6.x
- **Image Generation**: html2canvas-pro 2.x
- **Build Tool**: Vite 8
- **Code Quality**: ESLint 9, Prettier 3

## Installation Guide

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Steps

1. Clone the repository to your local machine:
```bash
git clone https://github.com/reynaldiarya/Gasoline-Generator-Receipt-React.js.git
```

2. Navigate to the project directory:
```bash
cd Gasoline-Generator-Receipt-React.js
```

3. Install the required dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application in your browser at `http://localhost:5173`.

## Configuration

The application is designed to be plug-and-play. However, you can customize certain aspects of the environment and build process.

### Environment Customization

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | The port on which the development server runs | `5173` |
| `NODE_ENV` | The environment mode (development/production) | `development` |

### Receipt Customization
Individual receipt widths and formats can be adjusted within the **SPBU Editor** component in the user interface, allowing for compatibility with various paper widths (e.g., 58mm or 80mm thermal printers).

## Usage

### Managing Gas Stations (SPBU)
1. Use the **SPBU Selector** to choose from existing station profiles.
2. Click the **Edit** button to modify the address, name, or receipt width of the selected station.
3. Use the **Add New** option to create a completely new station profile.

### Generating a Receipt
1. Select the desired station profile.
2. Fill in the **Transaction Inputs** (Volume, Price per Liter, etc.).
3. The **Preview Section** will update in real-time.
4. Click the **Generate & Cetak Nota** button.
5. The application will generate a PNG image and trigger the system print dialog.

## Project Structure

```text
/
├── app/
│   ├── components/       # Shared UI and functional components
│   │   ├── ui/           # Low-level UI primitives (Feedback, Loading)
│   │   ├── ReceiptView   # The receipt rendering engine
│   │   └── SpbuEditor    # Station configuration interface
│   ├── routes/           # Application pages and route definitions
│   ├── types/            # TypeScript interface and type definitions
│   └── utils/            # Formatting logic and helper functions
├── public/               # Static assets and icons
├── vite.config.ts        # Vite build and plugin configuration
├── tsconfig.json         # TypeScript compiler settings
└── tailwind.config.ts    # Tailwind CSS design tokens (if applicable)
```

## Scripts / Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Compiles the application for production deployment |
| `npm run start` | Serves the production build locally |
| `npm run typecheck` | Validates TypeScript types across the project |
| `npm run format` | Formats the entire codebase using Prettier |
| `npm run lint` | Analyzes code for potential errors and styling issues |

## Contributing

Contributions are essential to the improvement of this project. To contribute:

1. Fork the repository
2. Create a specific feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes with clear messages (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request for review

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for the full license text.

## Author

Originally Created by Ferdy Brawijaya Modified and Improved by Reynaldi Arya
