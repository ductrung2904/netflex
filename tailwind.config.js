module.exports = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx}',
    // './components/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "dark-lighten": "#2a2a2a",
        dark: "#222222",
        "dark-darken": "#1a1a1a",
        orange: "#ff4112",
        red: "#FF0000",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
