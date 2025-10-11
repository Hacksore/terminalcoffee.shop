import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = "Terminal Coffee Shop - Order Coffee Online | terminalcoffee.shop",
  description = "Order premium terminal coffee from your web browser. The ultimate terminal coffee shop experience - fresh coffee delivered to developers worldwide. Shop terminal coffee online today!",
  keywords = [
    "terminal coffee shop",
    "terminal coffee",
    "coffee shop",
    "online coffee ordering",
    "developer coffee",
    "terminal.shop coffee",
    "coffee delivery",
    "premium coffee",
    "terminal coffee ordering",
    "coffee for developers",
  ],
  canonical,
  ogImage = "/og.png",
  noindex = false,
}: SEOProps) => {
  const BASE_URL = process.env.VERCEL_ENV
    ? "https://terminalcoffee.shop"
    : "http://localhost:3000";

  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${BASE_URL}${ogImage}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Terminal Coffee Shop - Order Coffee Online"
      />
      <meta property="og:site_name" content="Terminal Coffee Shop" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta
        name="twitter:image:alt"
        content="Terminal Coffee Shop - Order Coffee Online"
      />
      <meta name="twitter:creator" content="@terminalcoffee" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Terminal Coffee Shop" />
      <meta name="publisher" content="terminalcoffee.shop" />
      <meta name="copyright" content="Terminal Coffee Shop" />
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />

      {/* Dublin Core */}
      <meta name="DC.title" content={title} />
      <meta name="DC.creator" content="Terminal Coffee Shop" />
      <meta name="DC.subject" content="Coffee Shop, E-commerce" />
      <meta name="DC.description" content={description} />
      <meta name="DC.publisher" content="terminalcoffee.shop" />
      <meta name="DC.contributor" content="Terminal Coffee Shop" />
      <meta name="DC.date" content="2024" />
      <meta name="DC.type" content="Service" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={fullCanonical} />
      <meta name="DC.source" content={BASE_URL} />
      <meta name="DC.language" content="en" />
      <meta name="DC.relation" content="terminal.shop" />
      <meta name="DC.coverage" content="Worldwide" />
      <meta name="DC.rights" content="Copyright Terminal Coffee Shop" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Terminal Coffee Shop",
            alternateName: "terminalcoffee.shop",
            url: BASE_URL,
            description: description,
            publisher: {
              "@type": "Organization",
              name: "Terminal Coffee Shop",
              url: BASE_URL,
              logo: {
                "@type": "ImageObject",
                url: fullOgImage,
                width: 1200,
                height: 630,
              },
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${BASE_URL}/?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Head>
  );
};
