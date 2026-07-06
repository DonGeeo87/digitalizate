import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ProfileProvider } from "@/lib/profile-store"
import { Toaster } from "@/components/ui/sonner"
import LenisProvider from "@/components/ux/LenisProvider"
import CustomCursor from "@/components/ux/CustomCursor"
import GrainOverlay from "@/components/ux/GrainOverlay"
import PageTransition from "@/components/ux/PageTransition"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Digitalízate — Tu entrenador de digitalización",
  description: "Desafíos de 5 minutos para digitalizar tu negocio. Sin teoría. Pura acción. Aparece en Google Maps, configura WhatsApp Business, recibe pagos online y más.",
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
    <html lang="es" className={`${inter.variable} dark h-full antialiased`} style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
      <body className="min-h-full flex flex-col bg-gray-950 text-white">
        <LenisProvider>
          <CustomCursor />
          <GrainOverlay />
          <ProfileProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <Toaster />
          </ProfileProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
