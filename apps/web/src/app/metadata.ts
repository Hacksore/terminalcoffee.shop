import type { Metadata } from "next";

const title = "Terminal Coffee Shop - Order Coffee Online | terminalcoffee.shop";
const description = "Order premium terminal coffee from your web browser. The ultimate terminal coffee shop experience - fresh coffee delivered to developers worldwide. Shop terminal coffee online today!";
const BASE_URL = process.env.VERCEL_ENV
  ? "https://terminalcoffee.shop"
  : "http://localhost:3000";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "terminal coffee shop",
    "terminal coffee",
    "coffee shop",
    "online coffee ordering",
    "developer coffee",
    "terminal.shop coffee",
    "coffee delivery",
    "premium coffee",
    "terminal coffee ordering",
    "coffee for developers"
  ],
  authors: [{ name: "Terminal Coffee Shop" }],
  creator: "Terminal Coffee Shop",
  publisher: "terminalcoffee.shop",
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
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title,
    description,
    siteName: "Terminal Coffee Shop",
    images: [
      {
        url: `${BASE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Terminal Coffee Shop - Order Coffee Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${BASE_URL}/og.png`],
    creator: "@terminalcoffee",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
