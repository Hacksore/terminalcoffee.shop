import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const BASE_URL = process.env.VERCEL_ENV
    ? "https://terminalcoffee.shop"
    : "http://localhost:3000";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Terminal Coffee Shop",
    "alternateName": "terminalcoffee.shop",
    "url": BASE_URL,
    "logo": `${BASE_URL}/og.png`,
    "description": "Order premium terminal coffee from your web browser. The ultimate terminal coffee shop experience - fresh coffee delivered to developers worldwide.",
    "sameAs": [
      "https://twitter.com/terminalcoffee",
      "https://github.com/terminalcoffee"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "offers": {
      "@type": "Offer",
      "category": "Coffee",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Hidden SEO content for search engines */}
        <meta name="keywords" content="terminal coffee shop, terminal coffee, coffee shop, online coffee ordering, developer coffee, terminal.shop coffee, coffee delivery, premium coffee, terminal coffee ordering, coffee for developers" />
        <meta name="subject" content="Terminal Coffee Shop - Online Coffee Ordering" />
        <meta name="classification" content="Coffee Shop, E-commerce, Food & Beverage" />
        <meta name="category" content="Coffee Shop" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="developers, programmers, coffee enthusiasts" />
        <meta name="audience" content="developers, programmers, coffee lovers" />
        <meta name="language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.8283, -98.5795" />
        <meta name="DC.title" content="Terminal Coffee Shop - Order Coffee Online" />
        <meta name="DC.creator" content="Terminal Coffee Shop" />
        <meta name="DC.subject" content="Coffee Shop, E-commerce" />
        <meta name="DC.description" content="Order premium terminal coffee from your web browser. The ultimate terminal coffee shop experience." />
        <meta name="DC.publisher" content="terminalcoffee.shop" />
        <meta name="DC.contributor" content="Terminal Coffee Shop" />
        <meta name="DC.date" content="2024" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content={BASE_URL} />
        <meta name="DC.source" content={BASE_URL} />
        <meta name="DC.language" content="en" />
        <meta name="DC.relation" content="terminal.shop" />
        <meta name="DC.coverage" content="Worldwide" />
        <meta name="DC.rights" content="Copyright Terminal Coffee Shop" />
        {/* Additional hidden content for SEO */}
        <div style={{ display: 'none' }}>
          <h1>Terminal Coffee Shop - The Ultimate Coffee Experience for Developers</h1>
          <h2>Order Terminal Coffee Online - Premium Coffee Delivery</h2>
          <h3>Terminal Coffee Shop - Where Developers Get Their Coffee Fix</h3>
          <p>Welcome to Terminal Coffee Shop, the premier destination for terminal coffee ordering online. Our terminal coffee shop offers the finest selection of coffee for developers and programmers worldwide. Experience the convenience of ordering terminal coffee from your web browser with our innovative terminal coffee shop platform.</p>
          <p>At Terminal Coffee Shop, we specialize in delivering premium terminal coffee directly to developers. Our terminal coffee shop combines the best of both worlds - exceptional coffee quality and seamless online ordering experience. Whether you're a seasoned developer or just starting your coding journey, our terminal coffee shop has the perfect coffee blend for you.</p>
          <p>Why choose Terminal Coffee Shop? We're not just another coffee shop - we're the terminal coffee shop that understands developers' needs. Our terminal coffee ordering system is designed specifically for the developer community, offering fast, reliable, and convenient coffee delivery services.</p>
          <p>Order from Terminal Coffee Shop today and discover why we're the preferred terminal coffee shop for developers worldwide. Our terminal coffee shop experience is unmatched, providing fresh, premium coffee delivered right to your doorstep.</p>
        </div>
      </head>
      <body
        className={`${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
