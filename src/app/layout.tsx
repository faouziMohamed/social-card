import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { geistMono, geistSans, inter, jetbrainsMono, merriweather, playfairDisplay, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "OG Graph — Open Graph Image Generator",
  description:
    "Self-hostable, API-first Open Graph & Social Meta Image Generator. 7 templates, instant preview, shareable builder URLs.",
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
