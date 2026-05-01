import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { geistMono, geistSans, inter, jetbrainsMono, merriweather, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import { env } from "@/lib/env";
import "./globals.css";

// Shared icon params: indigo accent, dark bg, rounded shape
const ICON_QS = "initial=O&accentColor=%236366f1&color=%230f0f0f&shape=rounded&theme=dark";

// Default OG image — general template, dark with gradient+grid
const OG_IMAGE_QS =
  "siteName=OG+Graph&title=Open+Graph+Image+Generator&description=Self-hostable+social+card+generator&theme=dark&accentColor=%236366f1&fontFamily=geist&bgStyle=gradient%2Bgrid";

export const metadata: Metadata = {
  metadataBase: new URL(env.deploymentURL),
  title: {
    default: "OG Graph — Open Graph Image Generator",
    template: "%s — OG Graph",
  },
  description:
    "Self-hostable, API-first Open Graph image generator. 11 templates, 8 SVG badges, 4 SEO assets. Drop a URL, get a social card.",
  icons: {
    icon: [
      { url: `/api/seo/favicon?${ICON_QS}`, type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: `/api/seo/apple-touch-icon?${ICON_QS}`, type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "OG Graph",
    title: "OG Graph — Open Graph Image Generator",
    description:
      "Self-hostable, API-first Open Graph image generator. 11 templates, 8 SVG badges, 4 SEO assets.",
    images: [
      {
        url: `/api/og/general?${OG_IMAGE_QS}`,
        width: 1200,
        height: 630,
        alt: "OG Graph — Open Graph Image Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OG Graph — Open Graph Image Generator",
    description:
      "Self-hostable, API-first Open Graph image generator. 11 templates, 8 SVG badges, 4 SEO assets.",
    images: [`/api/og/general?${OG_IMAGE_QS}`],
  },
};

const allFontVars = [
  geistSans.variable,
  geistMono.variable,
  inter.variable,
  spaceGrotesk.variable,
  merriweather.variable,
  playfairDisplay.variable,
  jetbrainsMono.variable,
].join(' ');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${allFontVars} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="og-graph-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
