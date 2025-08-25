# Weather App Frontend

A modern React-based weather application built with TypeScript and Vite.

## Features

- Real-time weather data display
- Location-based weather search
- Responsive design with Tailwind CSS
- User authentication
- Interactive weather dashboard

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   VITE_API_URL=http://localhost:3001
   VITE_WEATHER_API_KEY=your_weather_api_key
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── pages/              # Page components
├── hooks/              # Custom hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_WEATHER_API_KEY` - Weather service API key

## Deployment

This app is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request