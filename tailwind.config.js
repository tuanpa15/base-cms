/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "var(--grey)",
        "grey-100": "var(--grey-100)",
        primary: "var(--primary)",
        "primary-100": "var(--primary-100)",
        danger: "var(--danger)",
      },
      height: {
        header: "var(--header-height)",
        content: "calc(100vh - var(--header-height))",
      },
    },
  },
  plugins: [],
};
