/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#113065",
        secondary: "#fdb73e",
        tertiary: "#81b1ce"
      }
    },
    screens: {
      lg: { max: '2032px'},
      sm: { max: '639px' }
    }
  },
  plugins: []
};
