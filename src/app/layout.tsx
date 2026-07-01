import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ProfileProvider } from "@/lib/profile-store"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Digitalízate — Tu entrenador de digitalización",
  description:
    "Desafíos de 5 minutos para digitalizar tu negocio. Sin teoría. Pura acción. Aparece en Google Maps, configura WhatsApp Business, recibe pagos online y más.",
  keywords: [
    "digitalización",
    "emprendedores",
    "negocios digitales",
    "Google Maps",
    "WhatsApp Business",
    "PYMEs",
    "Latinoamérica",
    "marketing digital",
    "pagos online",
  ],
  openGraph: {
    title: "Digitalízate — Tu entrenador de digitalización",
    description: "Desafíos de 5 minutos para digitalizar tu negocio. Sin teoría. Pura acción.",
    type: "website",
    locale: "es_LA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ProfileProvider>
          {children}
          <Toaster />
        </ProfileProvider>
      </body>
    </html>
  )
}