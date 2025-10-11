import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-400">
      <div className="space-y-2">
        {/* Hidden SEO content for search engines */}
        <div style={{ display: "none" }}>
          <h1>Terminal Coffee Shop - Premium Coffee for Developers</h1>
          <h2>Order Terminal Coffee Online - Fast Delivery</h2>
          <p>
            Terminal Coffee Shop offers the best terminal coffee ordering
            experience for developers worldwide. Our terminal coffee shop
            provides premium coffee delivery services with seamless online
            ordering.
          </p>
          <p>
            Shop terminal coffee online at Terminal Coffee Shop - your trusted
            terminal coffee shop for quality coffee and exceptional service.
          </p>
        </div>

        <Link
          href="https://github.com/Hacksore/terminalcoffee.shop"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
          title="Terminal Coffee Shop Source Code"
        >
          View source on gitHub
        </Link>
        <p>
          This site is not affiliated with{" "}
          <a
            href="https://terminal.shop"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            title="Terminal Shop - Official Terminal Products"
          >
            terminal.shop
          </a>{" "}
          (Terminal Products Inc.) but it is using their{" "}
          <a
            href="https://www.terminal.shop/api"
            className="underline hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            title="Terminal Shop API Documentation"
          >
            official API
          </a>
        </p>

        {/* Additional SEO footer content */}
        <div className="mt-4 text-xs text-gray-500">
          <p>
            © 2024 Terminal Coffee Shop - Premium Coffee Delivery for
            Developers
          </p>
          <p>
            Order terminal coffee online | Terminal coffee shop | Coffee for
            developers
          </p>
        </div>
      </div>
    </footer>
  );
};
