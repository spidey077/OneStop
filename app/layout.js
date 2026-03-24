import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import CustomCursor from "@/components/CustomCursor";
import ScrollAnimations from "@/components/ScrollAnimations";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "OneStop Wholesale - Affordable Fashion & Accessories",
  description: "OneStop Wholesale offers premium-quality polo shirts, handbags, and t-shirts at unbeatable wholesale prices. Fashion that shapes your choice.",
  keywords: "Wholesale fashion, polo shirts, handbags, OneStop, wholesale t-shirts, Pakistan fashion wholesale",
  openGraph: {
    title: "OneStop Wholesale - Fashion that shapes your choice",
    description: "Discover high-quality wholesale fashion products including shirts, handbags & more at OneStop Wholesale.",
    url: "https://onestopwholesale.vercel.app/",
    siteName: "OneStop Wholesale",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CustomCursor />
        {/* We keep the loader if it matches existing styles, or remove it in React since React handles rendering smoothly */}
        {/* <div id="loader" className="hidden"><div className="loader-content"><div className="spinner"></div><p>LOADING THE STORE ...</p></div></div> */}
        
        <ThemeToggle />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
