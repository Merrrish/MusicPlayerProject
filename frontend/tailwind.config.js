/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        fontFamily: {
          custom: ['Misto', 'Arial', 'sans-serif'], // Добавьте ваш шрифт
          customA: ['Barley', 'Arial', 'sans-serif'], // Добавьте ваш шрифт
          customB: ['Crimson', 'Arial', 'sans-serif'], // Добавьте ваш шрифт
          customC: ['Allright', 'Arial', 'sans-serif'], // Добавьте ваш шрифт
          customCB: ['CrimsonB', 'Arial', 'sans-serif'], // Добавьте ваш шрифт
        },
        colors: {
          prpld: "#4915ea",
          prpl: "#8b5cf6",
          cbg: "#212121",
          card: "#fffdd4",
          cardbg: "#6a38f3",
      },
    },
  },
  plugins: [],
};

