'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroShaderBackground() {
  const containerRef = useRef(null)
  const animationFrameRef = useRef(null)
  const sceneRef = useRef(null)
  const mouseRef = useRef(new THREE.Vector2(10000, 10000))

  useEffect(() => {
    if (!containerRef.current) return

    // Dynamically import Three.js addons
    Promise.all([
      import('three/examples/jsm/postprocessing/EffectComposer.js'),
      import('three/examples/jsm/postprocessing/RenderPass.js'),
      import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
      import('three/examples/jsm/lines/Line2.js'),
      import('three/examples/jsm/lines/LineMaterial.js'),
      import('three/examples/jsm/lines/LineGeometry.js')
    ]).then(([
      { EffectComposer },
      { RenderPass },
      { UnrealBloomPass },
      { Line2 },
      { LineMaterial },
      { LineGeometry }
    ]) => {
      let scene, camera, renderer, composer, particles, energyLines = []
      let particleData = []

      function init() {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, 50)

        const canvas = containerRef.current
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          1.0,
          0.8,
          0.1
        )
        composer.addPass(bloomPass)

        createMainParticles()
        createEnergyLines()

        window.addEventListener('resize', onWindowResize)
        window.addEventListener('mousemove', onMouseMove)
        
        sceneRef.current = scene
      }

      function createMainParticles() {
        const particleCount = 15000
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        // Site blue colors: #7BB9E8 and #4A90E2
        const baseColor = new THREE.Color(0x001f3f) // Dark blue base

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          const x = (Math.random() - 0.5) * 120
          const y = (Math.random() - 0.5) * 120

          particleData.push({
            originalPos: new THREE.Vector3(x, y, (Math.random() - 0.5) * 20),
            currentPos: new THREE.Vector3(x, y, (Math.random() - 0.5) * 20),
            velocity: new THREE.Vector3(),
          })

          positions[i3] = x
          positions[i3 + 1] = y
          positions[i3 + 2] = particleData[i].originalPos.z

          baseColor.toArray(colors, i3)
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
          size: 1.5,
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true
        })

        particles = new THREE.Points(geometry, material)
        scene.add(particles)
      }

      function createEnergyLines() {
        const lineCount = 30
        for (let i = 0; i < lineCount; i++) {
          const geometry = new LineGeometry()
          const points = []
          const z = (Math.random() - 0.5) * 150 - 75
          const startX = (Math.random() - 0.5) * 150
          const startY = (Math.random() - 0.5) * 150
          const length = Math.random() * 10 + 5

          points.push(startX, startY, z)
          points.push(startX, startY - length, z)
          geometry.setPositions(points)

          // Blue color - site color scheme #7BB9E8
          const material = new LineMaterial({
            color: 0x7BB9E8,
            linewidth: 0.003,
            transparent: true,
            opacity: 0.5,
            dashed: false,
          })

          const line = new Line2(geometry, material)

          line.userData.speed = Math.random() * 30 + 15
          line.userData.originalZ = z

          energyLines.push(line)
          scene.add(line)
        }
      }

      function onWindowResize() {
        const width = window.innerWidth
        const height = window.innerHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
        composer.setSize(width, height)

        energyLines.forEach(line => {
          line.material.resolution.set(width, height)
        })
      }

      function onMouseMove(event) {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
      }

      const clock = new THREE.Clock()
      function animate() {
        animationFrameRef.current = requestAnimationFrame(animate)
        const delta = clock.getDelta()
        const elapsedTime = clock.getElapsedTime()

        const mousePos3D = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5)
        mousePos3D.unproject(camera)
        const dir = mousePos3D.sub(camera.position).normalize()
        const distance = -camera.position.z / dir.z
        const finalMousePos = camera.position.clone().add(dir.multiplyScalar(distance))

        const positions = particles.geometry.attributes.position.array
        const colors = particles.geometry.attributes.color.array
        // Blue highlight color - site color #7BB9E8
        const highlightColor = new THREE.Color(0x7BB9E8)

        for (let i = 0; i < particleData.length; i++) {
          const i3 = i * 3
          const data = particleData[i]

          const diff = new THREE.Vector3().subVectors(data.currentPos, finalMousePos)
          const dist = diff.length()
          let force = 0
          if (dist < 20) {
            force = (1 - (dist / 20)) * 0.1
            diff.normalize()
            data.velocity.add(diff.multiplyScalar(force))
          }

          const springForce = new THREE.Vector3().subVectors(data.originalPos, data.currentPos).multiplyScalar(0.01)
          data.velocity.add(springForce)
          data.velocity.multiplyScalar(0.92)

          data.currentPos.add(data.velocity)

          positions[i3] = data.currentPos.x
          positions[i3 + 1] = data.currentPos.y
          positions[i3 + 2] = data.currentPos.z + Math.sin(data.originalPos.x * 0.1 + elapsedTime) * 5.0

          let colorMix = dist < 20 ? (1 - dist / 20) : 0
          const baseBlue = new THREE.Color(0x001f3f)
          const color = baseBlue.lerp(highlightColor, colorMix)
          color.toArray(colors, i3)
        }
        particles.geometry.attributes.position.needsUpdate = true
        particles.geometry.attributes.color.needsUpdate = true

        energyLines.forEach(line => {
          line.position.z = (line.position.z + line.userData.speed * delta)
          if (line.position.z > 50) {
            line.position.z = -150
          }
        })

        composer.render()
      }

      init()
      animate()

      return () => {
        window.removeEventListener('resize', onWindowResize)
        window.removeEventListener('mousemove', onMouseMove)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        if (renderer) {
          renderer.dispose()
        }
        if (composer) {
          composer.dispose()
        }
        if (particles) {
          particles.geometry.dispose()
          particles.material.dispose()
        }
        energyLines.forEach(line => {
          line.geometry.dispose()
          line.material.dispose()
        })
      }
    }).catch(err => {
      console.error('Error loading Three.js modules:', err)
    })
  }, [])

  return (
    <canvas
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

