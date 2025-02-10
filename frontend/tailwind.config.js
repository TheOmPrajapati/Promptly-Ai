/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx, js, tsx}"],
  theme: {
    extend:{
      fontFamily: {
        plaster: ['Plaster', 'sans-serif '],
        college: ['College', 'sans-serif '],
        mont: ['Montserrat', 'sans-serif '],
        syne: ['Syne', 'sans-serif '],
        sans: ['Roboto', 'Arial', 'sans-serif'], // Adding Google Font
    },
    colors: {
      primary: '#1D4ED8',
      secondary: '#9333EA',
      accent: '#F97316',
    },
    plugins: [
      require('tailwind-scrollbar-hide') // Add this plugin
    ],
      backgroundImage: {
        'bg1': "url('./src/assets/AI_1.jpg')",
        'bg2': "url('./src/assets/AI_2.png')",
        'bg3': "url('./src/assets/AI_3.png')",
      }
    }
  },
  plugins: [],
}
