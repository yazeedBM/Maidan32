import Link from "next/link";

/**
 * Shared button set — every button style that repeats across the design:
 *
 *  - primary   → orange filled     ("اكتشف الهاكاثونات", "أنشئ فريقا!", "أنشئ إعلان !")
 *  - secondary → dark-blue filled  ("انضم للفريق !", "أعثر على فريق" on featured card)
 *  - submit    → amber filled      ("نشر الإعلان", "إرسال الطلب")
 *  - outline   → white/blue border ("أعثر على فريق" on dark hero, "تفاصيل عن الهاكاثون",
 *                                   "اعرف أكثر", "إلغاء", "مسح الفلاتر")
 *  - subscribe → light-blue filled (used by Newsletter directly)
 *
 * Each renders a <Link> when `href` is provided, otherwise a <button>.
 */

const BASE =
  "inline-flex items-center justify-center rounded-field font-bold transition-all duration-150 " +
  "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 select-none";

const SIZES = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm sm:text-base",
  lg: "h-13 px-9 py-3.5 text-base",
};

const VARIANTS = {
  primary:
    "bg-accent text-white shadow-btn hover:bg-accent-light active:scale-[0.98]",
  secondary:
    "bg-primary-dark text-white hover:bg-primary active:scale-[0.98]",
  submit:
    "bg-amber-btn text-white hover:brightness-105 active:scale-[0.98] shadow-card",
  "outline-light":
    "border-2 border-white text-white hover:bg-white/10 active:scale-[0.98]",
  "outline-blue":
    "border border-primary/40 bg-white text-primary hover:border-primary hover:bg-surface-blue active:scale-[0.98]",
  "outline-orange":
    "border border-accent/50 bg-white text-accent hover:border-accent hover:bg-accent-soft active:scale-[0.98]",
};

function ButtonInner({ variant, size, fullWidth, className, ...rest }) {
  const classes = [
    BASE,
    SIZES[size] ?? SIZES.md,
    VARIANTS[variant] ?? VARIANTS.primary,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (rest.href) {
    const { href, children, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { children, type = "button", ...btnRest } = rest;
  return (
    <button type={type} className={classes} {...btnRest}>
      {children}
    </button>
  );
}

/* ---- Named exports, one per design style ------------------------- */

export function PrimaryButton(props) {
  return <ButtonInner variant="primary" {...props} />;
}

export function SecondaryButton(props) {
  return <ButtonInner variant="secondary" {...props} />;
}

export function SubmitButton(props) {
  return <ButtonInner variant="submit" {...props} />;
}

export function OutlineLightButton(props) {
  return <ButtonInner variant="outline-light" {...props} />;
}

export function OutlineBlueButton(props) {
  return <ButtonInner variant="outline-blue" {...props} />;
}

export function OutlineOrangeButton(props) {
  return <ButtonInner variant="outline-orange" {...props} />;
}

export default ButtonInner;