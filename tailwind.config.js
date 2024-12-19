/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs' : '400px'
    },
      colors: {
        'custom-blue': '#0D00A1',
        'custom-purple': "#2A17F380",
        'custom-headblue' : "#2C509A",
        'custom-buttoncolor' : "#5153FF",
        'custom-bgcolor' : "#E6E4FF80",
      'custom-headpurple' :  '#B48EE9F2',
       'custom-cardgreen': '#E8FFE8',
       'custom-cardpeach': '#FBFFE1F5',
       'custom-cardblue': '#C3D7FF'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        alata: ['Alata', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
