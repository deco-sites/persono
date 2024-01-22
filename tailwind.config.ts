import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    fontSize: {
      xs: ["0.688rem", "1.25rem"], // 11px
      sm: ["0.813rem", "1.25rem"], // 13px
      md: ["0.875rem", "1.25rem"], // 14px
      base: ["1rem", "1.25rem"], // 16px
      xl: ["1.25rem", "normal"], // 20px
      "2xl": ["1.5rem", "normal"], // 24px
      "3xl": ["2.5rem", "normal"], // 40px
    },
    container: { center: true },
    extend: {
      colors: {
        "blueNew": "#0070F7",
      }
    }
  },
};
