'use client'

import { useEffect, useRef } from 'react'

export default function PyramidHeroBackground() {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const initPyramid = async () => {
      try {
        // Dynamic import Three.js
        const THREE = await import('three')
        
        const container = containerRef.current
        const scene = new THREE.Scene()
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.z = 5
        
        // Renderer with transparency
        const renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: true,
          powerPreference: 'low-power'
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)
        
        // Create pyramid geometry
        const geometry = new THREE.ConeGeometry(2, 3, 4)
        
        // Wireframe material with gradient-like effect
        const edges = new THREE.EdgesGeometry(geometry)
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x7BB9E8,
          linewidth: 2,
          transparent: true,
          opacity: 0.6
        })
        const wireframe = new THREE.LineSegments(edges, lineMaterial)
        
        // Semi-transparent faces
        const faceMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x7BB9E8,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide
        })
        const pyramid = new THREE.Mesh(geometry, faceMaterial)
        
        // Group them together
        const group = new THREE.Group()
        group.add(pyramid)
        group.add(wireframe)
        scene.add(group)
        
        // Add ambient particles/stars
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 200
        const posArray = new Float32Array(particlesCount * 3)
        
        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.03,
          color: 0x7BB9E8,
          transparent: true,
          opacity: 0.6
        })
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)
        
        // Animation
        let frameId
        const animate = () => {
          frameId = requestAnimationFrame(animate)
          
          // Gentle rotation
          group.rotation.x += 0.003
          group.rotation.y += 0.005
          
          // Subtle particle rotation
          particles.rotation.y += 0.001
          
          renderer.render(scene, camera)
        }
        
        animate()
        
        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        
        window.addEventListener('resize', handleResize)
        
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize)
          cancelAnimationFrame(frameId)
          renderer.dispose()
          geometry.dispose()
          edges.dispose()
          lineMaterial.dispose()
          faceMaterial.dispose()
          particlesGeometry.dispose()
          particlesMaterial.dispose()
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
        }
      } catch (error) {
        console.error('Failed to load pyramid animation:', error)
      }
    }
    
    initPyramid()
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ zIndex: 0 }}
      data-pyramid-container="true"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
    </div>
  )
}
