/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/containers/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        148: "42rem",
      },
      screens: {
        "fhd": "1920px",
        "qhd": "2560px",
      },
      width: {
        148: "42rem",
      },
    },
  },
  plugins: [],
};
