// app/layout.tsx  (Server Component — NO "use client")
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PrinTera — imprime sin límites",
  description:
    "Alquiler de impresoras y fotocopiadoras con servicio técnico y suministros incluidos. Sin inversión inicial, paga solo lo que imprimes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon-512.png",
  },
  openGraph: {
    title: "PrinTera — imprime sin límites",
    description:
      "Impresión empresarial sin fricción: equipos, soporte y suministros incluidos. Sin depreciación.",
    url: "https://tu-dominio.com",
    siteName: "PrinTera",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrinTera — imprime sin límites",
    description:
      "Alquila impresoras con servicio técnico y suministros incluidos. Paga solo lo que imprimes.",
    images: ["/og.png"],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* reCAPTCHA v3 */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}