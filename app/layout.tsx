import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cenk Duman - Fine Jewellery Designer",
  description: "Specializing in custom tennis bracelets and necklaces. Aesthetic precision meets timeless elegance.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Load rhino3dm library */}
        <Script src="https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0/rhino3dm.wasm.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
