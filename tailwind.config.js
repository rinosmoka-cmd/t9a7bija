/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        "primary-hover": "#6d28d9",
        secondary: "#a78bfa",
      },
      borderRadius: {
        container: "16px",
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "scroll-line": "scroll-line 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
