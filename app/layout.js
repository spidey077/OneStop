import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import CustomCursor from "@/components/CustomCursor";
import ScrollAnimations from "@/components/ScrollAnimations";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";

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
      <ClerkProvider>
        <body className={poppins.className}>
          <CartProvider>
            <CustomCursor />
            <ThemeToggle />
            <ScrollAnimations />
            {children}
            <CartDrawer />
          </CartProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
