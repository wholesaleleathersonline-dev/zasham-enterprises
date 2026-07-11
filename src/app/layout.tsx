import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/customcursor";
import PageWrapper from "../components/animation/PageWrapper";
import WelcomeOfferModal from "../components/ui/WelcomeOfferModal";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zashamenterprises.com"),

  title: {
    default: "Zasham Enterprises | Custom Sportswear Manufacturer",
    template: "%s | Zasham Enterprises",
  },

  description:
    "Zasham Enterprises is a premium custom sportswear manufacturer specializing in basketball, football, baseball, soccer, volleyball, rugby, cricket and team uniforms with worldwide shipping.",

  keywords: [
    "Custom Sportswear",
    "Basketball Uniforms",
    "American Football Uniforms",
    "Flag Football Uniforms",
    "Baseball Uniforms",
    "Soccer Uniforms",
    "Volleyball Uniforms",
    "Rugby Uniforms",
    "Cricket Uniforms",
    "Team Uniform Manufacturer",
    "Sublimation Uniforms",
    "Sports Apparel Manufacturer",
    "Pakistan Sportswear Manufacturer",
  ],

  authors: [{ name: "Zasham Enterprises" }],

  creator: "Zasham Enterprises",

  publisher: "Zasham Enterprises",

  openGraph: {
    title: "Zasham Enterprises",
    description:
      "Premium Custom Sportswear Manufacturer with Worldwide Shipping.",
    siteName: "Zasham Enterprises",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >



      <body className="min-h-full flex flex-col bg-[#0F0F0F]">

  <CustomCursor />
  <WelcomeOfferModal />

  <Header />

 <main className="flex-1">
  {children}
</main>

<Footer/>

</body>
    </html>
  );
}
