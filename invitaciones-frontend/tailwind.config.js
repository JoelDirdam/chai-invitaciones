/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hbg1': "url('/src/assets/invitations/lniuat2024/bg1.png')",
        'hbg1web': "url('/src/assets/invitations/lniuat2024/bg1web.png')",
        'hbg2': "url('/src/assets/invitations/lniuat2024/bg2.png')",
        'hbg2web': "url('/src/assets/invitations/lniuat2024/bg2web.png')",
        'hbg3': "url('/src/assets/invitations/lniuat2024/bg3.png')",
        'hbg3web': "url('/src/assets/invitations/lniuat2024/bg3web.png')",
        'hbg4': "url('/src/assets/invitations/lniuat2024/bg4.svg')",
        'hbg4web': "url('/src/assets/invitations/lniuat2024/bg4web.svg')",
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

