import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "https://melume-skinscience.com";

  return {
    metadataBase: new URL(origin),
    title: "Партнерство для косметологів | Melumé Skinscience",
    description:
      "Станьте партнером сучасного німецького бренду Melumé Skinscience.",
    openGraph: {
      title: "Melumé Skinscience — професійне партнерство",
      description:
        "Вигідні умови співпраці, навчання для команди, маркетингові матеріали та постійна підтримка.",
      type: "website",
      locale: "uk_UA",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Melumé Skinscience — професійне партнерство",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Melumé Skinscience — професійне партнерство",
      description:
        "Станьте партнером сучасного німецького бренду.",
      images: [`${origin}/og.png`],
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3254130894717290');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${cormorant.variable}`}
      >
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3254130894717290&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
