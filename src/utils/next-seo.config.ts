import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Exchange",
  description: "Exchange lorem ipsum",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: process.env.NEXT_PUBLIC_URL + "/images/og-image.jpg",
        width: 1256,
        height: 628,
        alt: "Exchange",
        type: "image/jpeg",
      },
    ],
    siteName: "Exchange",
  },
  twitter: {
    handle: "@DevelopersUp",
    site: "Exchange",
    cardType: "summary_large_image",
  },
};

export default config;
