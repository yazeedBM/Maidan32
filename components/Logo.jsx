import Link from "next/link";

export default function Logo({ variant = "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-navy-900";
  return (
    <Link href="/" className={`flex items-center gap-1.5 ${textColor}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M5 21V4a1 1 0 0 1 1-1h11.2a1 1 0 0 1 .8 1.6l-3.4 4.4a1 1 0 0 0 0 1.2l3.4 4.4a1 1 0 0 1-.8 1.6H6"
          fill="#f5a623"
        />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">ميدان</span>
    </Link>
  );
}
