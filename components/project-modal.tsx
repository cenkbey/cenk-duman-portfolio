"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stage, Html, useProgress } from "@react-three/drei"
import { Suspense } from "react"
import Image from "next/image"
import { GltfModel } from "./gltf-model"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    description: string
    images: string[]
    modelUrl?: string
    modelType?: "glb"
  }
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Model... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"images" | "3d">("images")

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-full h-auto p-0 overflow-hidden">
        {/* Header - küçültülmüş */}
        <DialogHeader className="px-4 py-2 border-b bg-background/95 backdrop-blur shrink-0">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-sm font-semibold text-primary truncate">{project.title}</DialogTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "images" ? "default" : "outline"}
                onClick={() => setViewMode("images")}
                size="sm"
                className="text-xs px-3 py-1 h-7"
              >
                Photos ({project.images.length})
              </Button>
              {project.modelUrl && (
                <Button
                  variant={viewMode === "3d" ? "default" : "outline"}
                  onClick={() => setViewMode("3d")}
                  size="sm"
                  className="text-xs px-3 py-1 h-7"
                >
                  3D Model
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Görsel Alanı - tam ekran ve ortalanmış */}
        <div className="w-full h-[calc(100vh-48px)] relative bg-white flex items-center justify-center">
          {viewMode === "images" ? (
            <div className="relative w-full h-full">
              <Image
                src={project.images[currentImageIndex] || '/placeholder.svg'}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 shadow-2xl z-30 h-14 w-14 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-7 w-7 text-gray-700" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 shadow-2xl z-30 h-14 w-14 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-7 w-7 text-gray-700" />
                  </Button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-gray-700 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-2xl z-30">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
          ) : (
            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200">
              <Canvas camera={{ position: [2, 2, 2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <Suspense fallback={<Loader />}>
                  <Stage environment="city" intensity={1.5} shadows="contact" adjustCamera={1.8}>
                    {project.modelUrl && <GltfModel url={project.modelUrl} />}
                  </Stage>
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={0.3}
                    maxDistance={10}
                    autoRotate={false}
                    autoRotateSpeed={0.5}
                  />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>

              {/* 3D Controls Info */}
              <div className="absolute bottom-3 left-3 bg-white/90 text-gray-700 border border-gray-200 px-4 py-3 rounded-lg text-sm shadow-2xl">
                <p className="font-semibold mb-2 text-gray-800">3D Controls:</p>
                <div className="space-y-1 text-xs">
                  <p>• <strong>Sol tık + sürükle:</strong> Döndür</p>
                  <p>• <strong>Sağ tık + sürükle:</strong> Hareket ettir</p>
                  <p>• <strong>Tekerlek:</strong> Zoom</p>
                </div>
              </div>

              {/* Model Info */}
              <div className="absolute top-3 right-3 bg-white/90 text-gray-700 border border-gray-200 px-4 py-3 rounded-lg text-sm shadow-2xl">
                <p className="font-semibold text-gray-800">3D Model</p>
                <p className="text-xs mt-1">GLB Format</p>
                <p className="text-xs">Interactive Preview</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
