/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette extracted from the Figma screenshots
        primary: {
          DEFAULT: "#1B75BB", // main blue (headings, links, filters)
          light: "#3B9BE0",   // lighter blue (subscribe button, hovers)
          dark: "#164E87",    // dark blue ("انضم للفريق" button)
          navy: "#0F3A66",    // deepest navy (hero headings on light pages)
        },
        accent: {
          DEFAULT: "#F5821F", // brand orange (logo dot, CTAs, labels)
          light: "#F9A64A",   // soft orange (hover states)
          soft: "#FDEBD3",    // pale orange chip background
        },
        amber: {
          btn: "#FFC20E",     // yellow submit buttons (نشر الإعلان / إرسال الطلب)
        },
        dark: {
          DEFAULT: "#0C0C10", // dark hero / newsletter / footer background
          soft: "#17171C",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F6F8",   // light gray page background (hackathons list)
          blue: "#EAF2FB",    // light blue wash background
          field: "#EDEEF0",   // form input background
          footer: "#DDE7F2",  // light footer background (matching page)
        },
        ink: {
          DEFAULT: "#1F2937",
          soft: "#6B7280",
          faint: "#9CA3AF",
        },
      },
      fontFamily: {
        // Registered in app/layout.jsx via next/font (Baloo Bhaijaan 2)
        sans: ["var(--font-baloo)", "Tahoma", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(15, 58, 102, 0.08)",
        "card-lg": "0 12px 40px rgba(15, 58, 102, 0.12)",
        chip: "0 1px 4px rgba(15, 58, 102, 0.06)",
        btn: "0 6px 18px rgba(245, 130, 31, 0.35)",
      },
      borderRadius: {
        card: "1rem",
        field: "0.5rem",
        pill: "9999px",
      },
      backgroundImage: {
        // Blue gradient band behind the "أحدث الهاكاثونات" carousel
        "carousel-band":
          "linear-gradient(180deg, #EAF2FB 0%, #BBD9F2 35%, #1B75BB 100%)",
        // Blue/orange champions section background
        "champions-glow":
          "radial-gradient(60% 80% at 85% 15%, rgba(245,130,31,0.55) 0%, rgba(245,130,31,0) 60%), radial-gradient(70% 90% at 10% 90%, rgba(245,166,74,0.55) 0%, rgba(245,166,74,0) 55%), linear-gradient(160deg, #2A86CE 0%, #1B75BB 45%, #0F3A66 100%)",
        // Dark hero overlay used on homepage / hackathons page
        "hero-overlay":
          "linear-gradient(90deg, rgba(12,12,16,0.95) 0%, rgba(12,12,16,0.72) 45%, rgba(12,12,16,0.25) 100%)",
        // Light hero overlay used on the matching (find a team) page
        "hero-overlay-light":
          "linear-gradient(90deg, rgba(234,242,251,0.95) 0%, rgba(234,242,251,0.55) 50%, rgba(234,242,251,0.15) 100%)",
      },
      maxWidth: {
        container: "80rem", // 1280px content width used across all pages
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};