const { groups } = require("./colorCard");

module.exports = {
  plugins: [
    "autoprefixer",
    "tailwindcss",
    "postcss-nesting",
    "postcss-nested",
    require("./themePlugin")({groups})
  ]
}