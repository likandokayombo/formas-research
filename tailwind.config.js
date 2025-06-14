/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Your custom font as default sans
        sans: ['CoveredByYourGrace', 'sans-serif'],
        
        // Additional font families
        grace: ['CoveredByYourGrace', 'cursive'],
        another: ['PPNeueMontreal-Bold', 'serif'],
        heading: ['PPNeueMontreal-Book', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  plugins: [],
}