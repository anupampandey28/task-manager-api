#Todo App - Web Frontend

A React + Vite frontend application for managing and tracking daily todo.

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool with Fast Refresh
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite Plugin** - @tailwindcss/vite for optimized styling
- **Material Tailwind** - React components built with Tailwind
- **React Tailwindcss Datepicker** - Date picking component
- **ESLint** - Code quality enforcement

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── DisplayList.jsx
│   ├── DTPicker.jsx
│   └── TodoCard.jsx
├── assets/             # Static assets
├── App.jsx             # Main App component
├── main.jsx            # Entry point
├── App.css
├── index.css          # Tailwind imports
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173` with Hot Module Replacement (HMR) enabled.

### Build

```bash
npm run build
```

Generates optimized production build in the `dist/` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality.

## Features

- Real-time todo tracking
- Responsive design with Tailwind CSS
- Fast development experience with Vite
- Production-ready build optimization

## Configuration Files

- `vite.config.js` - Vite configuration with React plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules

## Backend Connection

This frontend connects to the backend API running on a separate server. See the main [README](../README.md) for full project documentation.
