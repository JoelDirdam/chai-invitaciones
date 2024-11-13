/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hbg1': "url('/src/assets/invitations/lniuat2024/bg1.svg')",
        'hbg2': "url('/src/assets/invitations/lniuat2024/bg2.svg')",
      },
      fontFamily: {
        bison: ['Bison', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        qanect: ['"Qanect Elegant"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

