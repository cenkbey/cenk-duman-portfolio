"use client"
import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)

  useEffect(() => {
    // Mücevher için özel material ayarları
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const material = child.material

        if (material) {
          // Altın görünümü için
          material.metalness = 0.95
          material.roughness = 0.05
          material.envMapIntensity = 1.5

          // Eğer renk ayarlamak isterseniz:
          // material.color.set("#FFD700") // Altın
          // material.color.set("#C0C0C0") // Gümüş
        }
      }
    })
  }, [scene])

  return <primitive object={scene} />
}

// GLB dosyasını önceden yüklemek için (performans artışı)
useGLTF.preload("/models/emerald-necklace.glb")
