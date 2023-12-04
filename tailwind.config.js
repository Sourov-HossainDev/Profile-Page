/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        milongo : ['Milonga', 'serif'],
        nunito : ['Nunito', 'sans-serif']
      },
      colors : {
        regBg : '#f1f2f6',
        PurpleBlue : '#3742fa',
        loginbg : '#c8d6e5'

      },
      backgroundImage : {
        loginImage : 'url(./assets/LoginImage.jpg) '
      }
    },
  },
  plugins: [],
}

