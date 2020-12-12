module.exports = {
  purge: ["./source/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["IBM Plex Sans"],
    },
    extend: {
      spacing: {
        70: "17.5rem",
        160: "50rem",
      },
      colors: {
        blue: {
          100: "#cce4f6",
          200: "#99c9ed",
          300: "#66afe5",
          400: "#3394dc",
          500: "#0079d3",
          600: "#0061a9",
          600: "#0061a9",
          800: "#00497f",
          900: "#003054",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
