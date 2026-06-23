import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estação Marii — Embalagens, Presentes & Decorações",
  description:
    "Catálogo da Estação Marii: embalagens, presentes e decorações com preços de varejo e atacado. Monte seu pedido em poucos toques.",
  applicationName: "Estação Marii",
  openGraph: {
    title: "Estação Marii — Embalagens, Presentes & Decorações",
    description:
      "Catálogo de embalagens, presentes e decorações com preços de varejo e atacado.",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🎁%3C/text%3E%3C/svg%3E",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#a85f83",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-5 pb-28 md:px-6 md:pt-8 md:pb-16">
          {children}
        </main>
        <BottomNav />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
