import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "දෙ Max Fitness Club | Redefine Your Strength",
  description:
    "දෙ Max Fitness Club — Premium gym & fitness center with certified trainers, modern equipment, personal training, bodybuilding, cardio, group classes, and nutrition consultation. Join Sri Lanka's elite fitness destination.",
  keywords: [
    "gym",
    "fitness",
    "bodybuilding",
    "personal training",
    "Sri Lanka",
    "දෙ Max",
    "fitness club",
  ],
  openGraph: {
    title: "දෙ Max Fitness Club | Redefine Your Strength",
    description:
      "Premium gym & fitness center with certified trainers, modern equipment, and world-class facilities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise-bg">{children}</body>
    </html>
  );
}
