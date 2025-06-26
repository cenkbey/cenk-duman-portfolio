"use client"
import { useEffect, useState } from "react"
import * as THREE from "three"

// Rhino3dm loader utility
class Rhino3dmLoader extends THREE.Loader {
  constructor(manager?: THREE.LoadingManager) {
    super(manager)
  }

  load(
    url: string,
    onLoad: (object: THREE.Group) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ) {
    const loader = new THREE.FileLoader(this.manager)
    loader.setResponseType("arraybuffer")
    loader.setRequestHeader(this.requestHeader)
    loader.setPath(this.path)
    loader.setWithCredentials(this.withCredentials)

    loader.load(
      url,
      (buffer) => {
        try {
          const result = this.parse(buffer as ArrayBuffer)
          onLoad(result)
        } catch (e) {
          if (onError) {
            onError(e as ErrorEvent)
          } else {
            console.error(e)
          }
          this.manager.itemError(url)
        }
      },
      onProgress,
      onError,
    )
  }

  parse(buffer: ArrayBuffer): THREE.Group {
    // Initialize rhino3dm if available
    if (typeof window !== "undefined" && (window as any).rhino3dm) {
      return this.parseWithRhino3dm(buffer)
    } else {
      // Fallback: try to parse as a simple format or show placeholder
      console.warn("rhino3dm library not loaded, showing placeholder geometry")
      return this.createPlaceholderGeometry()
    }
  }

  private parseWithRhino3dm(buffer: ArrayBuffer): THREE.Group {
    const rhino = (window as any).rhino3dm
    const doc = rhino.File3dm.fromByteArray(new Uint8Array(buffer))
    const group = new THREE.Group()

    // Parse objects from the 3dm file
    const objects = doc.objects()
    for (let i = 0; i < objects.count; i++) {
      const rhinoObject = objects.get(i)
      const geometry = rhinoObject.geometry()

      if (geometry) {
        const mesh = this.convertRhinoGeometryToThree(geometry, rhino)
        if (mesh) {
          group.add(mesh)
        }
      }
    }

    doc.delete()
    return group
  }

  private convertRhinoGeometryToThree(rhinoGeometry: any, rhino: any): THREE.Mesh | null {
    const objectType = rhinoGeometry.objectType

    if (objectType === rhino.ObjectType.Mesh) {
      return this.convertMesh(rhinoGeometry)
    } else if (objectType === rhino.ObjectType.Brep) {
      // Convert BREP to mesh
      const mesh = rhino.Mesh.createFromBrep(rhinoGeometry)
      if (mesh && mesh.length > 0) {
        return this.convertMesh(mesh[0])
      }
    } else if (objectType === rhino.ObjectType.Surface) {
      // Convert surface to mesh
      const mesh = rhino.Mesh.createFromSurface(rhinoGeometry)
      if (mesh) {
        return this.convertMesh(mesh)
      }
    }

    return null
  }

  private convertMesh(rhinoMesh: any): THREE.Mesh {
    const geometry = new THREE.BufferGeometry()

    // Get vertices
    const vertices = []
    const vertexCount = rhinoMesh.vertices().count
    for (let i = 0; i < vertexCount; i++) {
      const vertex = rhinoMesh.vertices().get(i)
      vertices.push(vertex[0], vertex[1], vertex[2])
    }

    // Get faces
    const indices = []
    const faceCount = rhinoMesh.faces().count
    for (let i = 0; i < faceCount; i++) {
      const face = rhinoMesh.faces().get(i)
      if (face[2] === face[3]) {
        // Triangle
        indices.push(face[0], face[1], face[2])
      } else {
        // Quad - split into two triangles
        indices.push(face[0], face[1], face[2])
        indices.push(face[0], face[2], face[3])
      }
    }

    // Get normals if available
    const normals = []
    if (rhinoMesh.normals().count > 0) {
      for (let i = 0; i < rhinoMesh.normals().count; i++) {
        const normal = rhinoMesh.normals().get(i)
        normals.push(normal[0], normal[1], normal[2])
      }
    }

    geometry.setIndex(indices)
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    if (normals.length > 0) {
      geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3))
    } else {
      geometry.computeVertexNormals()
    }

    // Create material suitable for jewelry
    const material = new THREE.MeshStandardMaterial({
      color: "#bfa87e",
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1.0,
    })

    return new THREE.Mesh(geometry, material)
  }

  private createPlaceholderGeometry(): THREE.Group {
    const group = new THREE.Group()

    // Create a jewelry-like placeholder (ring shape)
    const ringGeometry = new THREE.TorusGeometry(1, 0.1, 8, 16)
    const material = new THREE.MeshStandardMaterial({
      color: "#bfa87e",
      metalness: 0.9,
      roughness: 0.1,
    })

    const ring = new THREE.Mesh(ringGeometry, material)
    group.add(ring)

    return group
  }
}

// Hook to use the Rhino3dm loader
export function useRhino3dmLoader(url: string) {
  const [model, setModel] = useState<THREE.Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    setError(null)

    const loader = new Rhino3dmLoader()

    loader.load(
      url,
      (loadedModel) => {
        setModel(loadedModel)
        setLoading(false)
      },
      undefined,
      (err) => {
        console.error("Error loading 3dm file:", err)
        setError("Failed to load 3D model")
        setLoading(false)
      },
    )
  }, [url])

  return { model, loading, error }
}

// Component to render Rhino 3dm models
export function RhinoModel({ url }: { url: string }) {
  const { model, loading, error } = useRhino3dmLoader(url)

  if (loading) {
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.5} />
      </mesh>
    )
  }

  if (error || !model) {
    // Fallback to placeholder jewelry model
    return (
      <group>
        <mesh>
          <torusGeometry args={[1, 0.1, 8, 16]} />
          <meshStandardMaterial color="#bfa87e" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.0} />
        </mesh>
      </group>
    )
  }

  return <primitive object={model} />
}
