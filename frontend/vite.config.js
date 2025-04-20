import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Set API URL based on the environment
  const isProduction = mode === 'production';
  const API_URL = isProduction
    ? 'https://your-production-backend-url.com'
    : 'http://localhost:5000';

  return {
    plugins: [react()],
    server: {
      port: 3000, // Frontend runs on port 3000
      proxy: {
        '/upload': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/process': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/extract-text': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
        '/generate-questions': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      rollupOptions: {
        input: './public/index.html', // Ensure correct entry point
      },
    },
    resolve: {
      alias: {
        '@': '/src', // Optional: set '@' as an alias for '/src'
      },
    },
  };
});

