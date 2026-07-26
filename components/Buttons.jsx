import Link from "next/link";

/**
 * Shared button set — one export per style that repeats in the Figma:
 *
 *  primary        → orange fill      ("اكتشف الهاكاثونات", "أنشئ فريقا!", "أنشئ إعلان !")
 *  secondary      → brand-blue fill  ("انضم للفريق !", "أعثر على فريق")
 *  submit         → amber fill       ("نشر الإعلان", "إرسال الطلب")
 *  outline-light  → white hairline   ("أعثر على فريق" on the dark hero)
 *  outline-blue   → blue hairline    ("اعرف أكثر", "إلغاء", "مسح الفلاتر")
 *  outline-orange → orange hairline  ("تفاصيل عن الهاكاثون")
 *
 * Renders a <Link> when `href` is given, a <button> otherwise.
 */

const BASE =
  "inline-flex items-center justify-center rounded-field font-bold leading-none " +
  "transition-all duration-150 select-none focus-visible:outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  xs: "h-9 px-4 text-[12px]",
  sm: "h-10 px-5 text-[13px]",
  md: "h-11 px-6 text-[14px]",
  lg: "h-12 px-8 text-[15px]",
};

const VARIANTS = {
  primary: "bg-accent text-white hover:bg-[#E07C05] active:scale-[0.985]",
  secondary: "bg-primary text-white hover:bg-[#04357A] active:scale-[0.985]",
  submit: "bg-amber-btn text-white hover:bg-[#EDB200] active:scale-[0.985]",
  "outline-light":
    "border border-white/90 text-white hover:bg-white hover:text-dark active:scale-[0.985]",
  "outline-blue":
    "border border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary/5 active:scale-[0.985]",
  "outline-orange":
    "border border-accent/45 bg-white text-accent hover:border-accent hover:bg-accent/5 active:scale-[0.985]",
};

function ButtonInner({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...rest
}) {
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
