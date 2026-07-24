import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSessionUser } from "@/lib/auth";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata = {
  title: "ميدان | اكتشف الهاكاثونات وأثبت على فريقك",
  description: "منصة ميدان تجمع الهاكاثونات والمشاركين في مكان واحد، لتسهّل عليك اكتشاف الفرص والمشاركة فيها.",
};

export default function RootLayout({ children }) {
  const user = getSessionUser();

  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased">
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
