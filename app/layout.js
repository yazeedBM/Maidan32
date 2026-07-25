import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";

/**
 * Baloo Bhaijaan 2 — rounded typeface matching the brand lettering in the
 * design ("ميدان" wordmark + Latin navbar items). Supports Arabic + Latin.
 */
const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata = {
  title: {
    default: "ميدان | اكتشف الهاكاثونات وأعثر على فريقك",
    template: "%s | ميدان",
  },
  description:
    "ميدان هو منصة تجمع الهاكاثونات والمبتكرين في مكان واحد، لتسهّل عليك اكتشاف الفرص والمشاركة فيها، سواء كنت ترغب في إنشاء فريقك الخاص أو الانضمام إلى فريق قائم.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ميدان | اكتشف الهاكاثونات وأعثر على فريقك",
    description:
      "اكتشف الهاكاثونات، أعثر على فريقك، و اصنع الأثر مع منصة ميدان.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={baloo.variable}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}