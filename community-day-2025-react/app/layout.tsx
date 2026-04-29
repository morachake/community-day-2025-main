import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { INITIAL_HASH_RESTORE_SCRIPT } from "@/lib/sectionScroll";
import {
  breadcrumbLd,
  eventLd,
  faqLd,
  organizationLd,
} from "@/lib/schemaLd";

export const viewport: Viewport = {
  themeColor: "#ff9900",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://awsusergroupkenya.co.ke"),
  manifest: "/manifest.json",
  title: "AWS Community Day Kenya 2026 | July 4 | Mombasa, Kenya",
  description:
    "Join AWS Community Day Kenya 2026 on July 4 in Mombasa. The Builder's Blueprint: architecting for tomorrow—keynotes, technical sessions, workshops, and networking with the Kenya AWS community. Register and stay updated!",
  keywords: [
    "AWS Community Day Kenya 2026",
    "AWS Mombasa",
    "cloud computing conference Kenya",
    "AWS User Group Kenya",
  ],
  authors: [{ name: "AWS User Group Kenya", url: "https://awsusergroupkenya.co.ke" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "en-ke": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "AWS Community Day Kenya 2026 - July 4 | Mombasa",
    description:
      "Join AWS Community Day Kenya 2026 in Mombasa, July 4. The Builder's Blueprint: architecting for tomorrow—sessions, workshops, and community networking.",
    type: "website",
    url: "https://awsusergroupkenya.co.ke",
    siteName: "AWS User Group Kenya",
    locale: "en_KE",
    images: [
      {
        url: "https://awsusergroupkenya.co.ke/images/AWS_CommunityDay_Kenya-2025.jpeg",
        width: 1200,
        height: 630,
        alt: "AWS Community Day Kenya 2026 - Mombasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aws_UGkenya",
    creator: "@aws_UGkenya",
    title: "AWS Community Day Kenya 2026 - July 4 | Mombasa",
    description:
      "AWS Community Day Kenya 2026—July 4 in Mombasa. Keynotes, technical sessions, workshops, and the Kenya AWS community.",
    images: [
      "https://awsusergroupkenya.co.ke/images/AWS_CommunityDay_Kenya-2025.jpeg",
    ],
  },
  category: "Events",
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AWS Community Day KE",
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: [{ url: "/images/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/images/safari-pinned-tab.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />

        {/* Match legacy DOM order: hash restore runs before interactive paint */}
        <Script
          id="initial-hash-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: INITIAL_HASH_RESTORE_SCRIPT,
          }}
        />

        <Script
          src="https://code.jquery.com/jquery-3.1.1.min.js"
          integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script src="/js/site.js" strategy="afterInteractive" />
        <Script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
          strategy="afterInteractive"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RE9PFE6J5E"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RE9PFE6J5E', {
                page_title: 'AWS Community Day Kenya 2026',
                page_location: 'https://awsusergroupkenya.co.ke',
                content_group1: 'Events',
                content_group2: 'AWS Community Day',
                custom_map: {'custom_parameter_1': 'event_category'}
              });
              gtag('event', 'page_view', {
                event_category: 'AWS Community Day',
                event_label: '2026 Event Page',
                value: 1
              });
            `,
          }}
        />
        <Script
          src="https://platform-api.sharethis.com/js/sharethis.js#property=630487e47db1160019f426e3&product=inline-share-buttons"
          strategy="lazyOnload"
        />

        <Script src="/js/previousevent.js" strategy="afterInteractive" />
        <Script src="/js/home-after.js" strategy="afterInteractive" />

        {children}
      </body>
    </html>
  );
}
