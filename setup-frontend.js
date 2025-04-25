const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
  'frontend/src',
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/context',
  'frontend/src/assets',
  'frontend/public'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create package.json
const packageJson = {
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
    "axios": "^1.6.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "react-toastify": "^9.1.3"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.6"
  }
};

fs.writeFileSync('frontend/package.json', JSON.stringify(packageJson, null, 2));

// Create vite.config.js
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});`;

fs.writeFileSync('frontend/vite.config.js', viteConfig);

// Create tailwind.config.js
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}`;

fs.writeFileSync('frontend/tailwind.config.js', tailwindConfig);

// Create postcss.config.js
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync('frontend/postcss.config.js', postcssConfig);

// Create index.html
const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shalvi Shop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

fs.writeFileSync('frontend/index.html', indexHtml);

// Create src/main.jsx
const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;

fs.writeFileSync('frontend/src/main.jsx', mainJsx);

// Create src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

fs.writeFileSync('frontend/src/index.css', indexCss);

console.log('Frontend setup completed successfully!'); 