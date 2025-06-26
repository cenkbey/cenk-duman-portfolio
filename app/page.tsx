"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Gem, Phone, MessageSquare } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "@/components/project-modal"

const projects = [
  {
    id: 1,
    title: "Tennis Bracelet 001",
    description: "4-prong diamond setting in white gold. Designed in RhinoGold.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Bracelet+001",
    alt: "Tennis Bracelet 001",
    images: [
      "/placeholder.svg?width=800&height=600&text=Bracelet+001+Photo+1",
      "/placeholder.svg?width=800&height=600&text=Bracelet+001+Photo+2",
      "/placeholder.svg?width=800&height=600&text=Bracelet+001+Photo+3",
    ],
  },
  {
    id: 2,
    title: "Emerald Cut Necklace",
    description: '14K gold tennis necklace with emerald cut stones. 9.60 ctw, 37 pieces, 16" length with box clasp.',
    imageUrl: "/images/emerald-necklace-specs.jpg",
    alt: "Emerald Cut Tennis Necklace - 14K Gold",
    images: [
      "/images/emerald-necklace-specs.jpg",
      "/placeholder.svg?width=800&height=600&text=Necklace+Detail+1",
      "/placeholder.svg?width=800&height=600&text=Necklace+Detail+2",
      "/placeholder.svg?width=800&height=600&text=Necklace+Clasp+Detail",
    ],
    modelUrl: "/models/v1-v2.glb",
    modelType: "glb",
  },
  {
    id: 3,
    title: "Custom Client Commission",
    description: "ZBrush sculpted bracelet with pavé setting details.",
    imageUrl: "/placeholder.svg?width=400&height=300&text=Custom+Bracelet",
    alt: "Custom Client Commission bracelet",
    images: [
      "/placeholder.svg?width=800&height=600&text=Custom+Bracelet+Photo+1",
      "/placeholder.svg?width=800&height=600&text=Custom+Bracelet+Photo+2",
    ],
  },
]

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="#" className="flex items-center font-semibold text-lg">
            <Gem className="mr-2 h-5 w-5 text-primary" />
            Cenk Duman
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="w-full py-20 md:py-32 lg:py-40 xl:py-48 flex items-center justify-center text-center bg-muted/30"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-primary">
                Fine Jewellery Designer
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/80">
                Specializing in custom tennis bracelets and necklaces.
                <br />
                Aesthetic precision meets timeless elegance in every piece I design.
              </p>
              <Button size="lg" asChild className="mt-4">
                <Link href="#portfolio">View my work</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Portfolio</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A selection of my CAD-based custom creations.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.alt}
                    width={400}
                    height={300}
                    className="h-60 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="p-4 bg-background">
                    <h3 className="text-xl font-semibold text-primary group-hover:text-primary/90">{project.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                    <p className="mt-2 text-xs text-primary font-medium">Click to view details</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-20 lg:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">About Me</h2>
              <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
                <p>Hi, I&apos;m Cenk – a fine jewellery designer with a focus on CAD-based custom creations.</p>
                <p>
                  With experience in designing tennis bracelets and necklaces, I combine clean lines with intricate
                  detail to produce wearable art. My work blends modern elegance with traditional craftsmanship, always
                  aiming to turn your vision into wearable beauty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Collaborate</h2>
              <p className="text-lg text-muted-foreground">
                For commissions, collaborations, or CV inquiries, please feel free to reach out.
              </p>
              <div className="flex flex-col items-center space-y-4 pt-4">
                <a
                  href="mailto:cenkdmn18@gmail.com"
                  className="flex items-center space-x-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>cenkdmn18@gmail.com</span>
                </a>
                <a
                  href="tel:+905323425834"
                  className="flex items-center space-x-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+90 532 342 58 34</span>
                </a>
                <a
                  href="https://wa.me/905323425834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
                <div className="flex items-center space-x-2 text-lg text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Istanbul</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cenk Duman. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Crafted with precision and passion.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}
    </div>
  )
}
