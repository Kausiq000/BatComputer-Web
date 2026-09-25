import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://batcomputer-web.vercel.app"),
  title: {
    default: "BATCOMPUTER // Wayne Enterprises Tactical Mainframe",
    template: "%s | BATCOMPUTER",
  },
  description:
    "Classified Wayne Enterprises tactical terminal and portfolio mainframe. Access the Dark Knight's arsenal, allies, rogues gallery, and cinematic archives.",
  keywords: [
    "Batman",
    "Batcomputer",
    "Wayne Enterprises",
    "Bruce Wayne",
    "The Dark Knight",
    "Gotham City",
    "3D Portfolio",
    "Interactive 3D",
    "Three.js",
    "Tactical Mainframe",
  ],
  authors: [{ name: "Wayne Enterprises R&D / Bruce Wayne" }],
  creator: "Wayne Enterprises",
  publisher: "Wayne Enterprises Applied Sciences Division",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BATCOMPUTER // Wayne Enterprises Tactical Mainframe",
    description:
      "High-security classified tactical terminal. Review Gotham City threats, the Dark Knight's arsenal, and cinematic mission files.",
    url: "https://batcomputer-web.vercel.app",
    siteName: "BATCOMPUTER",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/photos/bruce.jpg",
        width: 1200,
        height: 630,
        alt: "BATCOMPUTER Tactical Terminal - Wayne Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BATCOMPUTER // Wayne Enterprises Tactical Mainframe",
    description:
      "High-security classified tactical terminal. Review Gotham City threats, the Dark Knight's arsenal, and cinematic mission files.",
    images: ["/photos/bruce.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://batcomputer-web.vercel.app/#website",
      "url": "https://batcomputer-web.vercel.app",
      "name": "BATCOMPUTER",
      "description": "Classified Wayne Enterprises tactical terminal and portfolio mainframe.",
      "publisher": {
        "@type": "Organization",
        "name": "Wayne Enterprises",
        "logo": {
          "@type": "ImageObject",
          "url": "https://batcomputer-web.vercel.app/photos/bruce.jpg"
        }
      }
    },
    {
      "@type": "Person",
      "@id": "https://batcomputer-web.vercel.app/#person",
      "name": "Bruce Wayne",
      "alternateName": ["Batman", "The Dark Knight"],
      "jobTitle": "Vigilante & Philanthropist",
      "worksFor": {
        "@type": "Organization",
        "name": "Wayne Enterprises"
      },
      "image": "https://batcomputer-web.vercel.app/photos/bruce.jpg",
      "description": "Protector of Gotham City operating through the Batcomputer tactical interface."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${oswald.variable} antialiased font-sans bg-[#0a0a0a] text-[#ededed]`}
      >
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
