import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { Navbar } from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RAZE — Digital Experience Designer",
  description: "Creating digital experiences that feel alive. Award-winning portfolio of a futuristic creative director.",
  keywords: ["portfolio", "creative director", "digital design", "3D", "WebGL", "GSAP", "Next.js"],
  authors: [{ name: "RAZE" }],
  openGraph: {
    title: "RAZE — Digital Experience Designer",
    description: "Creating digital experiences that feel alive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased cursor-none`}
      >
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
