module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // ✅ Ensures Tailwind scans your files
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // Navy
        secondary: '#6b46c1', // Purple
        accent: '#f0e6f6', // Light Lavender
        'button-primary': '#4caf50',
        'button-primary-hover': '#388e3c',
        'button-secondary': '#6b46c1',
        'button-secondary-hover': '#553c9a',
        'link-color': '#6366F1', // Purple
        'link-hover': '#06B6D4', // Cyan
      },
    },
  },
  plugins: [],
};

