import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    fontSize: {
      xs: ["0.688rem", "1.25rem"],
      sm: ["0.813rem", "1.25rem"],
      md: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.25rem"],
      xl: ["1.25rem", "normal"],
      "2xl": ["1.5rem", "normal"],
      "3xl": ["2.5rem", "normal"],
    },
    container: { center: true },
  },
};
