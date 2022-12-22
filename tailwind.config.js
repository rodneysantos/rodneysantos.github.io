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
      "1366px": "1366px",
      "1440px": "1440px",
      "1600px": "1600px",
      "1728px": "1728px",
      "1920px": "1920px",
      "2560px": "2560px",
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
    const value = multiplier * ratio;
    values[`c${multiplier}`] = `${value.toFixed(3)}rem`;
    multiplier--;
  }

  return values;
}

/** @type {import('tailwindcss').Config} */
module.exports = config;
