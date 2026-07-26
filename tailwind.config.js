/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Sampled directly from the Figma frames */
        primary: {
          DEFAULT: "#034191", // brand blue — headings, labels, join button
          light: "#0991F3",   // subscribe button / light accents
          dark: "#023068",    // deepest navy
        },
        accent: {
          DEFAULT: "#F78B0F", // brand orange
          light: "#FBA544",
          soft: "#FFE599",    // category badge fill
          pale: "#FDEEDA",    // pale orange chip fill
        },
        amber: {
          btn: "#FEBF00",     // نشر الإعلان / إرسال الطلب
        },
        dark: {
          DEFAULT: "#1F2227", // hero / navbar band
          deep: "#0F0B0C",    // newsletter + footer band
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#EEEFF1",   // hackathons + matching page background
          field: "#ECEEF1",   // form input fill
          footer: "#E6ECF4",  // light footer on the form pages
          blue: "#EDF3FA",    // pale wash for the auth + profile screens
        },
        /* Legacy aliases kept so the admin screens (which have no Figma
           frame) keep rendering correctly without being refactored. */
        navy: {
          800: "#3A4553",
          900: "#1B2735",
          950: "#0E1620",
        },
        brand: {
          blue: "#034191",
          orange: "#F78B0F",
        },
        ink: {
          DEFAULT: "#232B33",
          soft: "#5B6672",
          faint: "#98A2AE",
        },
      },
      fontFamily: {
        sans: ["var(--font-baloo)", "Tahoma", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 14px rgba(3, 65, 145, 0.07)",
        "card-lg": "0 10px 34px rgba(3, 65, 145, 0.13)",
        chip: "0 1px 3px rgba(3, 65, 145, 0.07)",
      },
      borderRadius: {
        card: "14px",
        field: "8px",
        pill: "9999px",
      },
      backgroundImage: {
        /* Pale blue → mid blue band behind the "أحدث الهاكاثونات" carousel */
        "carousel-band":
          "linear-gradient(180deg, #F3F6FA 0%, #E5EBF4 22%, #C1CEE1 58%, #93B4DA 100%)",
        /* Blue field with warm corner glows — "أبطال الميدان" */
        "champions-glow":
          "radial-gradient(75% 60% at 0% 100%, #F9C46B 0%, rgba(249,196,107,0) 55%)," +
          "radial-gradient(60% 55% at 100% 100%, #F6B45E 0%, rgba(246,180,94,0) 60%)," +
          "linear-gradient(200deg, #0B92F1 0%, #1478D8 45%, #0096FA 100%)",
        /* Dark scrim over the homepage hero photo (text sits right, RTL) */
        "hero-scrim":
          "linear-gradient(270deg, #1F2227 0%, rgba(31,34,39,0.97) 22%, rgba(31,34,39,0.55) 52%, rgba(31,34,39,0.35) 100%)",
        /* Blue scrim over the matching-page hero */
        "hero-scrim-blue":
          "linear-gradient(270deg, #0C4893 0%, rgba(12,72,147,0.88) 30%, rgba(12,72,147,0.45) 62%, rgba(12,72,147,0.15) 100%)",
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
      },
    },
  },
  plugins: [],
};
