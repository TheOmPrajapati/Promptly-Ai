/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        plaster: ['Plaster', 'sans-serif '],
        college: ['College', 'sans-serif '],
        mont: ['Montserrat', 'sans-serif '],
        syne: ['Syne', 'sans-serif '],
      },
      backgroundImage: {
        'bg1': "url('./src/assets/AI_1.jpg')",
        'bg2': "url('./src/assets/AI_2.png')",
        'bg3': "url('./src/assets/AI_3.png')",
      }
    },
  },
  plugins: [],
}