module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electricBlue: '#007bff',
        vibrantPurple: '#8a2be2',
        mintGreen: '#3ddc97',
        softYellow: '#ffd700',
        lightGray: '#f5f5f5',
        darkCharcoal: '#333333',
        primary: '#ffd700', // softYellow
        secondary: '#333333', // darkCharcoal
      },
    },
  },
  darkMode: 'class', // Enables dark mode using a CSS class
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'), // Optional: Handles aspect ratio styling
  ],
};

