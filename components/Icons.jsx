/**
 * Central icon set — inline SVGs, all stroke-based, sized via className.
 * Every icon accepts standard SVG props (className, aria-hidden, etc.).
 * Default size h-4 w-4 to match the stat chips in the design.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function ClockIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function UsersIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15.2c2.6.3 4.6 1.9 5.3 4.8" />
    </svg>
  );
}

export function DollarIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 2v20" />
      <path d="M16.5 6.5c-.9-1.2-2.5-2-4.5-2-2.8 0-4.5 1.6-4.5 3.7 0 4.9 9.4 2.4 9.4 7.3 0 2.2-1.9 3.7-4.9 3.7-2.2 0-4-.9-4.9-2.3" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 2.5V7M16 2.5V7" />
    </svg>
  );
}

export function LocationIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.6-4.6" />
    </svg>
  );
}

export function FilterIcon({ className = "h-5 w-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 5h16l-6.2 7.4v5.1L10.2 20v-7.6L4 5z" />
    </svg>
  );
}

export function MedalIcon({ className = "h-8 w-8", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M12 12.2l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 14.3l2-.3.9-1.8z" strokeWidth="1.3" />
      <path d="M8.5 9.8 5.5 3h4l2.5 5.2L14.5 3h4l-3 6.8" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Carousel arrow pointing to previous items (visually left) */
export function ArrowLeftIcon({ className = "h-5 w-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

/** Carousel arrow pointing to next items (visually right) */
export function ArrowRightIcon({ className = "h-5 w-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/** Back arrow used next to "عودة" — points left-to-right text start in RTL */
export function BackArrowIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}