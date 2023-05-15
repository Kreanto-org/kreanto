import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kreanto.org",
    siteName: "Kreanto",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default config;
