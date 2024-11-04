# DevBoard Frontend

This project aims to create a platform where developers can share knowledge, ask questions, and earn recognition for their contributions.

Visit the app: DevBoard

## Overview

DevBoard’s frontend is designed to provide a smooth and modern user experience. It interfaces with an Express backend (hosted in a separate repository) to handle data storage, authentication, and business logic.

## Getting Started

### Prerequisites

    •	Node.js v14 or higher

### Installation

1. Clone the repository:

`git clone git@github.com:dilkhush-raj/devboard-frontend.git`
`cd devboard-frontend`

2. Install dependencies:

`npm install`

3. Set up environment variables (see Environment Variables).
4. Start the development server:

`npm run dev`

The app will be available at http://localhost:3000.

### Building for Production

To create an optimized production build:

`npm run build`

To start the production server:

`npm run start`

### Environment Variables

Create a .env.local file in the root directory to define environment variables. These are the essential variables required:

`NEXT_PUBLIC_BACKEND_SERVER_BASE_URL=`
`BACKEND_SERVER_BASE_URL=`
