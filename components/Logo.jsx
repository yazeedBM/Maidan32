/**
 * "ميدان" brand wordmark + gear/lightbulb mark.
 *
 * The mark in the design is a gear with a lightbulb cut-out sitting at the
 * start (right side) of the wordmark, with the bulb's glow dot in orange.
 * Recreated as inline SVG so it stays crisp at any size and can switch
 * tone without extra image assets.
 *
 * tone="light" → white wordmark (dark navbars / dark footer)
 * tone="dark"  → blue wordmark  (light navbar / light footer)
 */
export default function Logo({ tone = "light", className = "" }) {
  const wordmark = tone === "light" ? "#FFFFFF" : "#1B75BB";

  return (
    <span
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      {/* Gear + bulb mark */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Gear body */}
        <path
          d="M24 4l3.2 4.6 5.4-1.4 1.2 5.5 5.5 1.2-1.4 5.4L42.5 22l-3.6 4.3 2.6 5-4.9 2.7.2 5.6-5.6.2-2.7 4.9-5-2.6L19.2 45l-4.3-3.6-5.3 1.9-1.9-5.3L2.4 36l1.9-5.3L1 26.5l3.6-4.3-2.6-5 4.9-2.7-.2-5.6 5.6-.2 2.7-4.9 5 2.6L24 4z"
          fill="#F5821F"
          opacity="0"
        />
        <circle
          cx="24"
          cy="24"
          r="15"
          stroke="#F5821F"
          strokeWidth="6"
          strokeDasharray="6 4"
          fill="none"
        />
        {/* Lightbulb inside the gear */}
        <path
          d="M24 14c-4.4 0-8 3.6-8 8 0 2.9 1.6 5.4 3.9 6.8V31a1.5 1.5 0 0 0 1.5 1.5h5.2A1.5 1.5 0 0 0 28 31v-2.2c2.3-1.4 3.9-3.9 3.9-6.8 0-4.4-3.5-8-7.9-8z"
          fill={wordmark}
        />
        {/* Bulb base */}
        <rect x="21" y="33.5" width="6" height="2.5" rx="1.25" fill={wordmark} />
      </svg>

      {/* Wordmark */}
      <svg
        width="86"
        height="30"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="ميدان"
        className="shrink-0"
      >
        <text
          x="118"
          y="29"
          textAnchor="end"
          fontFamily="var(--font-baloo), Tahoma, sans-serif"
          fontWeight="800"
          fontSize="28"
          fill={wordmark}
          letterSpacing="4"
        >
          ميـدان
        </text>
        {/* Orange spark dot above the wordmark — echoes the bulb glow */}
        <circle cx="26" cy="7" r="3.5" fill="#F5821F" />
      </svg>
    </span>
  );
}