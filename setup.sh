#!/bin/bash

# Create project directories
mkdir -p frontend/src/{components,pages,assets,context}

# Create necessary configuration files
echo '{
  "name": "e-commerce",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.18",
    "@heroicons/react": "^2.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "tailwindcss": "^3.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "vite": "^5.1.6"
  }
}' > frontend/package.json

# Create Vite config
echo 'import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});' > frontend/vite.config.js

# Create Tailwind config
echo 'module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};' > frontend/tailwind.config.js

# Create PostCSS config
echo 'module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};' > frontend/postcss.config.js

# Create main CSS file
echo '@tailwind base;
@tailwind components;
@tailwind utilities;' > frontend/src/index.css

# Create main entry point
echo 'import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);' > frontend/src/main.jsx

# Create App component
echo 'import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;' > frontend/src/App.jsx 