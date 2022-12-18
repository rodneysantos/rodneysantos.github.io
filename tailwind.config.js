const customSizes = customSizing(30);
const content = [
  "./src/pages/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
  "./src/containers/**/*.{js,jsx,ts,tsx}",
];

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    height: customSizes,
    padding: customSizes,
    screens: {
      "hd": "1280px",
      "720p": "1366px",
      "fhd": "1920px",
      "qhd": "2560px",
    },
    spacing: customSizes,
    width: customSizes,
  },
};
const config = {
  content,
  theme,
  plugins: [],
};

function customSizing(multiplier) {
  const values = {};
  const ratio = 1.618;

  while (multiplier > 0) {
    values[`c${multiplier}`] = `${multiplier * ratio}rem`;
    multiplier--;
  }

  return values;
}

/** @type {import('tailwindcss').Config} */
module.exports = config;
