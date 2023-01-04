const fixedSizes = customFixedSizing(30);
const fractionSizes = customFractionSizing(24);
const gridRows = customGridRows();
const content = [
  "./src/pages/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
  "./src/containers/**/*.{js,jsx,ts,tsx}",
];

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    gridTemplateRows: gridRows,
    height: fixedSizes,
    padding: fixedSizes,
    screens: {
      "360px": "360px",
      "390px": "390px",
      "414px": "414px",
      "601px": "601px",
      "768px": "768px",
      "810px": "810px",
      "1024px": "1024px",
      "1366px": "1366px",
      "1440px": "1440px",
      "1600px": "1600px",
      "1728px": "1728px",
      "1920px": "1920px",
      "2560px": "2560px",
    },
    spacing: fixedSizes,
    width: { ...fixedSizes, ...fractionSizes },
  },
};
const config = {
  content,
  theme,
  plugins: [],
};

function customFixedSizing(multiplier) {
  const values = {};
  const ratio = 1.618;

  while (multiplier > 0) {
    const value = multiplier * ratio;
    values[`c${multiplier}`] = `${value.toFixed(3)}rem`;
    multiplier--;
  }

  return values;
}

function customFractionSizing(multiplier) {
  const originalValue = multiplier;
  const values = {};

  while (multiplier > 0) {
    const value = 100 / (originalValue / multiplier);
    const key = `c${multiplier}/${originalValue}`;
    values[key] = `${value}%`;
    multiplier--;
  }

  return values;
}

function customGridRows() {
  const values = {};
  const rows = [
    { res: "601px", val: "130px" },
    { res: "768px", val: "180px" },
    { res: "810px", val: "193px" },
    { res: "1024px", val: "258px" },
  ];

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    values[row.res] = `repeat(auto-fill, ${row.val})`;
  }

  return values;
}

/** @type {import('tailwindcss').Config} */
module.exports = config;
