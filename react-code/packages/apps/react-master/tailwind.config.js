/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx, ts, jsx, js}"
  ],
  theme: {
    extend: {
      colors: {
        white: "mycolor(white)",
        black: "mycolor(black)",
        gray:{
          50: "mycolor(gray50)",
          100: "mycolor(gray100)",
          200: "mycolor(gray200)",
          300: "mycolor(gray300)",
          400: "mycolor(gray400)",
          500: "mycolor(gray500)",
          600: "mycolor(gray600)",
          700: "mycolor(gray700)",
          800: "mycolor(gray800)",
          900: "mycolor(gray900)",
        }
      }
    },
  },
  plugins: [],
}

