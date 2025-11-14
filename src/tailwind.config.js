/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}" // добавьте эту строку если HTML файлы в корне
    
  ],
  theme: {
     extend: {
                    colors: {
                        'gray-bg': '#636363',
                        'dark-header': '#4e4e4e',
                        'dark-sidebar': '#414141',
                        'button-bg': '#787878',
                        'button2-bg': '#4e4e4e',
                        'accent-green': '#00ffb3',
                        'light-green': '#5ffeb9',
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                    },
                    width: {
                        'sidebar': '253px',
                        'main': '1187px',
                    },
                    height: {
                        'header': '58px',
                        'content': '842px',
                    }
                }
  },
  plugins: [],
}