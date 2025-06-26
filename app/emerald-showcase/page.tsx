"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmeraldNecklaceShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Back Button */}
      <div className="p-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        {/* Main Container */}
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Image Section */}
          <div className="relative w-full">
            {/* Image Container - Dominant Size */}
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] max-h-[900px] rounded-3xl overflow-hidden bg-white shadow-2xl group">
              {/* Soft Inner Shadow for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 z-10 pointer-events-none"></div>

              {/* Main Image */}
              <Image
                src="/images/emerald-necklace-specs.jpg"
                alt="Emerald Cut Necklace - Luxury Jewelry"
                fill
                className="object-contain p-8 md:p-12 lg:p-16 group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
              />

              {/* Subtle Vignette Effect */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/20 pointer-events-none"></div>
            </div>

            {/* Floating Title */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-gray-100">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 tracking-wide">
                  Emerald Cut Elegance
                </h1>
              </div>
            </div>
          </div>

          {/* Product Details - Minimal */}
          <div className="mt-12 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8">
                14K gold tennis necklace with emerald cut stones. 9.60 ctw, 37 pieces, 16" length with box clasp.
              </p>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-gray-800 mb-2">14K</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Gold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-gray-800 mb-2">9.60</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Total Carats</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-gray-800 mb-2">37</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Stones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-gray-800 mb-2">16"</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Length</div>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Accent Line */}
          <div className="flex justify-center mt-16">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
