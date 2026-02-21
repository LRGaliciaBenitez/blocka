export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        // Backgrounds
        bg: {
          main: "#0B1220",
          card: "#111A2E",
          hover: "#16213A",
          input: "#0F172A",
        },

        // Text
        text: {
          primary: "#E5E7EB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
          placeholder: "#64748B",
        },

        // Borders & dividers
        border: {
          DEFAULT: "#1F2937",
          input: "#1E293B",
        },

        // Brand / actions
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },

        // States
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#FACC15",
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        xl: "12px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
