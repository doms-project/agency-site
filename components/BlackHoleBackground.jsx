'use client'

import { useEffect, useRef, useState } from 'react'

export default function BlackHoleBackground() {
  const containerRef = useRef(null)
  const initializedRef = useRef(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return

    // Initialize immediately for faster load - no delays for above-the-fold content
    const initAnimation = () => {
      const container = document.querySelector('[data-blackhole-container]')
      if (!container) {
        // Retry immediately if container not ready
        requestAnimationFrame(initAnimation)
        return
      }

      if (initializedRef.current) return
      
      try {
        initializedRef.current = true
        setIsLoading(true)

        // Pre-compute shader values
      const BLACK_HOLE_RADIUS = 1.3
      const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.2
      const DISK_OUTER_RADIUS = 8.0
      const DISK_INNER_RADIUS_STR = DISK_INNER_RADIUS.toFixed(2)
      const DISK_OUTER_RADIUS_STR = DISK_OUTER_RADIUS.toFixed(2)

      // Build fragment shader with interpolated values
      // Simplified stable shader - no pulsing, no noise, clean gradient
      const diskFragmentShader = `
        uniform vec3 uColorHot;
        uniform vec3 uColorMid1;
        uniform vec3 uColorMid2;
        uniform vec3 uColorMid3;
        uniform vec3 uColorOuter;
        uniform float uDensity;
        varying vec2 vUv;
        varying float vRadius;
        varying float vAngle;
        
        void main() {
          float normalizedRadius = smoothstep(${DISK_INNER_RADIUS_STR}, ${DISK_OUTER_RADIUS_STR}, vRadius);
          
          // Clean color gradient - no noise
          vec3 color = uColorOuter;
          color = mix(color, uColorMid3, smoothstep(0.0, 0.25, normalizedRadius));
          color = mix(color, uColorMid2, smoothstep(0.2, 0.55, normalizedRadius));
          color = mix(color, uColorMid1, smoothstep(0.5, 0.75, normalizedRadius));
          color = mix(color, uColorHot, smoothstep(0.7, 0.95, normalizedRadius));
          
          // Stable brightness - no pulsing
          float brightness = pow(1.0 - normalizedRadius, 1.0) * 3.5 + 0.5;
          
          // Clean alpha with smooth falloff
          float alpha = uDensity * 0.6;
          alpha *= smoothstep(0.0, 0.15, normalizedRadius);
          alpha *= (1.0 - smoothstep(0.85, 1.0, normalizedRadius));
          alpha = clamp(alpha, 0.0, 1.0);
          
          gl_FragColor = vec4(color * brightness, alpha);
        }
      `

      // Inject script immediately - use dynamic imports with esm.sh which handles internal dependencies
      // Create and inject the animation script
      const script = document.createElement('script')
      script.type = 'module'
      
      // Use esm.sh CDN which properly bundles Three.js with all internal dependencies resolved
      const THREE_CDN = 'https://esm.sh/three@0.163.0'
      const scriptLines = [
        "(async function() {",
        "try {",
        `const THREE = await import('${THREE_CDN}');`,
        `const { OrbitControls } = await import('${THREE_CDN}/examples/jsm/controls/OrbitControls.js');`,
        `const { EffectComposer } = await import('${THREE_CDN}/examples/jsm/postprocessing/EffectComposer.js');`,
        `const { RenderPass } = await import('${THREE_CDN}/examples/jsm/postprocessing/RenderPass.js');`,
        `const { UnrealBloomPass } = await import('${THREE_CDN}/examples/jsm/postprocessing/UnrealBloomPass.js');`,
        `const { ShaderPass } = await import('${THREE_CDN}/examples/jsm/postprocessing/ShaderPass.js');`,
        "",
        "const BLACK_HOLE_RADIUS = 1.3;",
        "const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.2;",
        "const DISK_OUTER_RADIUS = 8.0;",
        "const DISK_TILT_ANGLE = Math.PI / 3.0;",
        "",
        "const scene = new THREE.Scene();",
        "scene.fog = new THREE.FogExp2(0x020104, 0.025);",
        "",
        "const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);",
        "const isMobileDevice = isMobile || window.innerWidth < 768;",
        "// Quality tiers: mobile (fastest load), medium, high",
        "const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory && navigator.deviceMemory <= 2);",
        "const quality = isMobileDevice ? 'mobile' : (isLowEnd ? 'medium' : 'high');",
        "",
        "// Use same FOV as desktop, but adjust camera position for mobile to show full animation",
        "const cameraFOV = 60;",
        "const camera = new THREE.PerspectiveCamera(cameraFOV, window.innerWidth / window.innerHeight, 0.1, 4000);",
        "// Mobile: Camera further back for smaller, more balanced black hole",
        "const aspectRatio = window.innerWidth / window.innerHeight;",
        "const isPortrait = aspectRatio < 1;",
        "if (isMobileDevice) {",
        "  // Further back for smaller black hole on mobile",
        "  camera.position.set(-9.5, 7.5, 9.5);",
        "} else {",
        "  camera.position.set(-6.5, 6.0, 6.5);",
        "}",
        "",
        "const container = document.querySelector('[data-blackhole-container]');",
        "if (!container) { console.error('BlackHoleBackground: Container not found'); return; }",
        "",
        "const heroSection = container.closest('#hero') || container.parentElement;",
        "if (heroSection) {",
        "  const updateHeight = () => {",
        "    const heroHeight = heroSection.offsetHeight;",
        "    container.style.height = heroHeight + 'px';",
        "  };",
        "  updateHeight();",
        "  const resizeObserver = new ResizeObserver(updateHeight);",
        "  resizeObserver.observe(heroSection);",
        "}",
        "",
        "const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: true });",
        "renderer.setSize(window.innerWidth, window.innerHeight);",
        "// Mobile: Lower pixel ratio for faster load and rendering",
        "const pixelRatio = isMobileDevice ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2.5);",
        "renderer.setPixelRatio(pixelRatio);",
        "renderer.setClearColor(0x000000, 0);",
        "renderer.outputColorSpace = THREE.SRGBColorSpace;",
        "renderer.toneMapping = THREE.ACESFilmicToneMapping;",
        "// Enhanced tone mapping exposure for better visual quality",
        "renderer.toneMappingExposure = quality === 'high' ? 1.2 : 1.0;",
        "",
        "const canvas = renderer.domElement;",
        "canvas.style.cssText = 'display:block!important;width:100%!important;height:100%!important;position:absolute!important;top:0!important;left:0!important;z-index:0!important;pointer-events:none!important;opacity:1!important;visibility:visible!important;background:transparent!important;';",
        "container.appendChild(canvas);",
        "",
        "const composer = new EffectComposer(renderer);",
        "composer.addPass(new RenderPass(scene, camera));",
        "",
        "// Enhanced bloom settings for better visual quality",
        "const bloomPass = new UnrealBloomPass(",
        "  new THREE.Vector2(window.innerWidth, window.innerHeight),",
        "  quality === 'high' ? 1.0 : 0.8,",
        "  quality === 'high' ? 0.8 : 0.6,",
        "  quality === 'high' ? 1.1 : 0.8",
        ");",
        "composer.addPass(bloomPass);",
        "",
        "const lensingShader = {",
        "  uniforms: {",
        "    'tDiffuse': { value: null },",
        "    'blackHoleScreenPos': { value: new THREE.Vector2(0.5, 0.5) },",
        "    'lensingStrength': { value: 0.12 },",
        "    'lensingRadius': { value: 0.3 },",
        "    'aspectRatio': { value: window.innerWidth / window.innerHeight },",
        "    'chromaticAberration': { value: 0.005 },",
        "    'teleportIntensity': { value: 0.0 }",
        "  },",
        "  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',",
        "  fragmentShader: 'uniform sampler2D tDiffuse; uniform vec2 blackHoleScreenPos; uniform float lensingStrength; uniform float lensingRadius; uniform float aspectRatio; uniform float chromaticAberration; uniform float teleportIntensity; varying vec2 vUv; void main() { vec2 screenPos = vUv; vec2 toCenter = screenPos - blackHoleScreenPos; toCenter.x *= aspectRatio; float dist = length(toCenter); float baseDistortion = lensingStrength / (dist * dist + 0.003); float teleportDistortion = baseDistortion * (1.0 + teleportIntensity * 2.5); float distortionAmount = clamp(teleportDistortion, 0.0, 0.85); float falloff = smoothstep(lensingRadius, lensingRadius * 0.3, dist); distortionAmount *= falloff; vec2 offset = normalize(toCenter) * distortionAmount; offset.x /= aspectRatio; float teleportChromatic = chromaticAberration * (1.0 + teleportIntensity * 3.0); vec2 distortedUvR = screenPos - offset * (1.0 + teleportChromatic); vec2 distortedUvG = screenPos - offset; vec2 distortedUvB = screenPos - offset * (1.0 - teleportChromatic); float r = texture2D(tDiffuse, distortedUvR).r; float g = texture2D(tDiffuse, distortedUvG).g; float b = texture2D(tDiffuse, distortedUvB).b; vec3 color = vec3(r, g, b); float teleportGlow = teleportIntensity * 0.3 * (1.0 - smoothstep(0.0, 0.4, dist)); color += vec3(0.2, 0.4, 0.6) * teleportGlow; gl_FragColor = vec4(color, 1.0); }'",
        "};",
        "const lensingPass = new ShaderPass(lensingShader);",
        "composer.addPass(lensingPass);",
        "",
        "const controls = new OrbitControls(camera, renderer.domElement);",
        "controls.enableDamping = true;",
        "controls.dampingFactor = 0.035;",
        "controls.rotateSpeed = 0.4;",
        "controls.autoRotate = true;",
        "controls.autoRotateSpeed = 0.1;",
        "controls.enableRotate = false;",
        "controls.enableZoom = false;",
        "controls.target.set(0, 0, 0);",
        "controls.minDistance = 2.5;",
        "controls.maxDistance = 100;",
        "controls.enablePan = false;",
        "controls.update();",
        "",
        "const starGeometry = new THREE.BufferGeometry();",
        "// Star count based on quality - minimal on mobile for fast load",
        "const starCount = quality === 'high' ? 200000 : quality === 'medium' ? 100000 : quality === 'mobile' ? 10000 : 30000;",
        "const starPositions = new Float32Array(starCount * 3);",
        "const starColors = new Float32Array(starCount * 3);",
        "const starSizes = new Float32Array(starCount);",
        "const starTwinkle = new Float32Array(starCount);",
        "const starFieldRadius = 2000;",
        "const starPalette = [",
        "  new THREE.Color(0xffffff), new THREE.Color(0xE2F6FF), new THREE.Color(0x91D46C),",
        "  new THREE.Color(0xE2F6FF), new THREE.Color(0xffffff), new THREE.Color(0x91D46C),",
        "  new THREE.Color(0xE2F6FF), new THREE.Color(0xffffff), new THREE.Color(0x91D46C),",
        "  new THREE.Color(0xE2F6FF)",
        "];",
        "",
        "for (let i = 0; i < starCount; i++) {",
        "  const i3 = i * 3;",
        "  const phi = Math.acos(-1 + (2 * i) / starCount);",
        "  const theta = Math.sqrt(starCount * Math.PI) * phi;",
        "  const radius = Math.cbrt(Math.random()) * starFieldRadius + 100;",
        "  starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);",
        "  starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);",
        "  starPositions[i3 + 2] = radius * Math.cos(phi);",
        "  const starColor = starPalette[Math.floor(Math.random() * starPalette.length)].clone();",
        "  starColor.multiplyScalar(Math.random() * 0.7 + 0.3);",
        "  starColors[i3] = starColor.r;",
        "  starColors[i3 + 1] = starColor.g;",
        "  starColors[i3 + 2] = starColor.b;",
        "  starSizes[i] = THREE.MathUtils.randFloat(0.6, 3.0);",
        "  starTwinkle[i] = Math.random() * Math.PI * 2;",
        "}",
        "starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));",
        "starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));",
        "starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));",
        "starGeometry.setAttribute('twinkle', new THREE.BufferAttribute(starTwinkle, 1));",
        "",
        "const starMaterial = new THREE.ShaderMaterial({",
        "  uniforms: {",
        "    uTime: { value: 0 },",
        "    uPixelRatio: { value: renderer.getPixelRatio() }",
        "  },",
        "  vertexShader: 'uniform float uTime; uniform float uPixelRatio; attribute float size; attribute float twinkle; varying vec3 vColor; varying float vTwinkle; void main() { vColor = color; vTwinkle = sin(uTime * 2.5 + twinkle) * 0.5 + 0.5; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }',",
        "  fragmentShader: 'varying vec3 vColor; varying float vTwinkle; void main() { float dist = distance(gl_PointCoord, vec2(0.5)); if (dist > 0.5) discard; float alpha = 1.0 - smoothstep(0.0, 0.5, dist); alpha *= (0.2 + vTwinkle * 0.8); gl_FragColor = vec4(vColor, alpha); }',",
        "  transparent: true,",
        "  vertexColors: true,",
        "  blending: THREE.AdditiveBlending,",
        "  depthWrite: false",
        "});",
        "",
        "const stars = new THREE.Points(starGeometry, starMaterial);",
        "scene.add(stars);",
        "",
        "// Increased segments for smoother black hole geometry",
        "const eventHorizonSegments = quality === 'high' ? 128 : quality === 'medium' ? 96 : 48;",
        "const eventHorizonGeom = new THREE.SphereGeometry(BLACK_HOLE_RADIUS * 1.05, eventHorizonSegments, eventHorizonSegments / 2);",
        "const eventHorizonMat = new THREE.ShaderMaterial({",
        "  uniforms: {",
        "    uTime: { value: 0 },",
        "    uCameraPosition: { value: camera.position }",
        "  },",
        "  vertexShader: 'varying vec3 vNormal; varying vec3 vPosition; void main() { vNormal = normalize(normalMatrix * normal); vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',",
        "  fragmentShader: 'uniform float uTime; uniform vec3 uCameraPosition; varying vec3 vNormal; varying vec3 vPosition; void main() { vec3 viewDirection = normalize(uCameraPosition - vPosition); float fresnel = 1.0 - abs(dot(vNormal, viewDirection)); fresnel = pow(fresnel, 2.5); vec3 glowColor = vec3(0.518, 0.765, 0.380); float pulse = sin(uTime * 1.0) * 0.05 + 0.95; gl_FragColor = vec4(glowColor * fresnel * pulse, fresnel * 0.4); }',",
        "  transparent: true,",
        "  blending: THREE.AdditiveBlending,",
        "  side: THREE.BackSide",
        "});",
        "",
        "const eventHorizon = new THREE.Mesh(eventHorizonGeom, eventHorizonMat);",
        "eventHorizon.position.y = isMobileDevice ? 0.5 : 1.4;",
        "scene.add(eventHorizon);",
        "",
        "const blackHoleGeom = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, eventHorizonSegments, eventHorizonSegments / 2);",
        "const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });",
        "const blackHoleMesh = new THREE.Mesh(blackHoleGeom, blackHoleMat);",
        "blackHoleMesh.position.y = isMobileDevice ? 0.5 : 1.4;",
        "blackHoleMesh.renderOrder = 0;",
        "scene.add(blackHoleMesh);",
        "",
        "",
        "// Increased segments for smoother accretion disk",
        "const diskRadialSegments = quality === 'high' ? 256 : quality === 'medium' ? 192 : 96;",
        "const diskGeometry = new THREE.RingGeometry(DISK_INNER_RADIUS, DISK_OUTER_RADIUS, diskRadialSegments * 2, diskRadialSegments);",
        "const diskMaterial = new THREE.ShaderMaterial({",
        "  uniforms: {",
        "    uTime: { value: 0.0 },",
        "    uColorHot: { value: new THREE.Color(0x84C361) },",
        "    uColorMid1: { value: new THREE.Color(0x127298) },",
        "    uColorMid2: { value: new THREE.Color(0x144584) },",
        "    uColorMid3: { value: new THREE.Color(0x144584) },",
        "    uColorOuter: { value: new THREE.Color(0x127298) },",
        "    uNoiseScale: { value: 2.5 },",
        "    uFlowSpeed: { value: 0.22 },",
        "    uDensity: { value: 1.3 }",
        "  },",
        "  vertexShader: 'varying vec2 vUv; varying float vRadius; varying float vAngle; void main() { vUv = uv; vRadius = length(position.xy); vAngle = atan(position.y, position.x); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',",
        "  fragmentShader: 'FRAGMENT_SHADER_PLACEHOLDER',",
        "  transparent: true,",
        "  side: THREE.DoubleSide,",
        "  depthWrite: false,",
        "  blending: THREE.AdditiveBlending",
        "});",
        "",
        "const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);",
        "accretionDisk.rotation.x = DISK_TILT_ANGLE;",
        "accretionDisk.position.y = isMobileDevice ? 0.5 : 1.4;",
        "accretionDisk.renderOrder = 1;",
        "scene.add(accretionDisk);",
        "",
        "",
        "let resizeTimeout;",
        "window.addEventListener('resize', () => {",
        "  clearTimeout(resizeTimeout);",
        "  resizeTimeout = setTimeout(() => {",
        "    // Use same FOV as desktop, but adjust camera position for mobile to show full animation",
        "    const newAspectRatio = window.innerWidth / window.innerHeight;",
        "    const isPortraitNow = newAspectRatio < 1;",
        "    const isMobileNow = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;",
        "    const newFOV = 60;",
        "    camera.fov = newFOV;",
        "    // Mobile: Further back for smaller black hole",
        "    if (isMobileNow) {",
        "      camera.position.set(-9.5, 7.5, 9.5);",
        "    } else {",
        "      camera.position.set(-6.5, 6.0, 6.5);",
        "    }",
        "    camera.aspect = window.innerWidth / window.innerHeight;",
        "    camera.updateProjectionMatrix();",
        "    renderer.setSize(window.innerWidth, window.innerHeight);",
        "    composer.setSize(window.innerWidth, window.innerHeight);",
        "    bloomPass.resolution.set(window.innerWidth, window.innerHeight);",
        "    lensingPass.uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;",
        "    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3.0));",
        "    camera.updateProjectionMatrix();",
        "    renderer.setSize(window.innerWidth, window.innerHeight);",
        "    composer.setSize(window.innerWidth, window.innerHeight);",
        "    bloomPass.resolution.set(window.innerWidth, window.innerHeight);",
        "    lensingPass.uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;",
        "    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3.0));",
        "  }, 150);",
        "});",
        "",
        "const clock = new THREE.Clock();",
        "clock.start(); // Start clock immediately",
        "const blackHoleScreenPosVec3 = new THREE.Vector3();",
        "",
        "let isVisible = true;",
        "let lastFrameTime = 0;",
        "const targetFPS = 45; // Same FPS for mobile and desktop",
        "const frameInterval = 1000 / targetFPS;",
        "",
        "document.addEventListener('visibilitychange', () => {",
        "  isVisible = !document.hidden;",
        "  if (isVisible) {",
        "    clock.start();",
        "    lastFrameTime = performance.now();",
        "  } else {",
        "    clock.stop();",
        "  }",
        "});",
        "",
        "// Scroll-based zoom effect",
        "let scrollY = 0;",
        "let targetZoom = 0;",
        "let currentZoom = 0;",
        "let lastScrollY = 0;",
        "// Base camera position for zoom calculations",
        "const baseCameraPos = new THREE.Vector3(-6.5, 6.0, 6.5);",
        "const blackHoleCenter = new THREE.Vector3(0, isMobile ? 0.5 : 1.4, 0);",
        "const maxZoomDistance = 2.5;",
        "",
        "const handleScroll = () => {",
        "  scrollY = window.scrollY;",
        "  const heroSection = document.getElementById('hero');",
        "  if (!heroSection) return;",
        "  const heroHeight = heroSection.offsetHeight;",
        "  // Clamp scroll progress between 0 and 1, works bidirectionally",
        "  const scrollProgress = Math.max(0, Math.min(scrollY / heroHeight, 1.0));",
        "  targetZoom = scrollProgress;",
        "  lastScrollY = scrollY;",
        "};",
        "",
        "// Only add scroll listener on desktop - mobile stays static",
        "if (!isMobile) {",
        "  window.addEventListener('scroll', handleScroll, { passive: true });",
        "}",
        "",
        "function animate() {",
        "  requestAnimationFrame(animate);",
        "  if (!isVisible) return;",
        "",
        "  // Frame rate limiting",
        "  const now = performance.now();",
        "  const elapsed = now - lastFrameTime;",
        "  if (elapsed < frameInterval) return;",
        "  lastFrameTime = now - (elapsed % frameInterval);",
        "",
        "  const elapsedTime = clock.getElapsedTime();",
        "  const deltaTime = clock.getDelta();",
        "",
        "  // Zoom effect - only on desktop, bidirectional (zoom in and out)",
        "  if (!isMobile) {",
        "    // Synchronized smooth interpolation - works both directions",
        "    const interpolationSpeed = 0.08;", 
        "    currentZoom += (targetZoom - currentZoom) * interpolationSpeed;",
        "    ",
        "    // Calculate new camera position based on current zoom (0 to 1)",
        "    const directionToBlackHole = new THREE.Vector3().subVectors(blackHoleCenter, baseCameraPos).normalize();",
        "    const distanceToBlackHole = baseCameraPos.distanceTo(blackHoleCenter);",
        "    const minDistance = maxZoomDistance;",
        "    const maxDistance = distanceToBlackHole;",
        "    ",
        "    // currentZoom = 0 means full distance (zoomed out), currentZoom = 1 means min distance (zoomed in)",
        "    const currentDistance = maxDistance - (maxDistance - minDistance) * currentZoom;",
        "    const newCameraPos = new THREE.Vector3().copy(blackHoleCenter).addScaledVector(directionToBlackHole, -currentDistance);",
        "    ",
        "    // Always update camera position to follow zoom",
        "    camera.position.lerp(newCameraPos, interpolationSpeed);",
        "  }",
        "  // Mobile: Camera stays completely static",
        "",
        "  // Teleport effect",
        "  const teleportIntensity = currentZoom * 0.8;",
        "  lensingPass.uniforms.teleportIntensity.value = teleportIntensity;",
        "  // Bloom intensity - minimal on mobile for performance",
        "  const baseBloom = quality === 'high' ? 1.0 : quality === 'mobile' ? 0.5 : 0.8;",
        "  const bloomMultiplier = quality === 'mobile' ? 0.2 : (quality === 'high' ? 0.5 : 0.4);",
        "  const enhancedBloom = baseBloom + teleportIntensity * bloomMultiplier;",
        "  bloomPass.intensity = enhancedBloom;",
        "",
        "  // Update star animation only (keep stars twinkling)",
        "  starMaterial.uniforms.uTime.value = elapsedTime;",
        "  // Disk has no time-based effects now (stable)",
        "  // Event horizon glow still pulses gently",
        "  eventHorizonMat.uniforms.uTime.value = elapsedTime;",
        "  eventHorizonMat.uniforms.uCameraPosition.value.copy(camera.position);",
        "  blackHoleScreenPosVec3.copy(blackHoleMesh.position).project(camera);",
        "  lensingPass.uniforms.blackHoleScreenPos.value.set(",
        "    (blackHoleScreenPosVec3.x + 1) / 2,",
        "    (blackHoleScreenPosVec3.y + 1) / 2",
        "  );",
        "  controls.update();",
        "  // Gentle rotation - slower for stability",
        "  stars.rotation.y += deltaTime * 0.001; // Reduced from 0.002",
        "  stars.rotation.x += deltaTime * 0.0004; // Reduced from 0.0008",
        "  accretionDisk.rotation.z += deltaTime * 0.002; // Reduced from 0.004 - slower, more stable",
        "  composer.render(deltaTime);",
        "}",
        "",
        "console.log('BlackHoleBackground: Animation started');",
        "animate();",
        "} catch (error) {",
        "  console.error('BlackHoleBackground: Error loading Three.js', error);",
        "}",
        "})();"
      ]

      // Replace the placeholder with the actual fragment shader
      let scriptContent = scriptLines.join('\n')
      scriptContent = scriptContent.replace("'FRAGMENT_SHADER_PLACEHOLDER'", JSON.stringify(diskFragmentShader))
      
      script.textContent = scriptContent
      document.body.appendChild(script)
      
      // Set loading to false after a short delay to allow initialization
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      
      console.log('BlackHoleBackground: Script injected')
    } catch (error) {
      console.error('BlackHoleBackground: Error initializing', error)
      setHasError(true)
      setIsLoading(false)
      initializedRef.current = false
    }
  }

    // Initialize immediately - no delay for above-the-fold content
    // Use requestAnimationFrame to ensure DOM is ready but don't wait
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        initAnimation()
      })
    }
    
    return () => {
      if (!initializedRef.current) {
        initializedRef.current = false
      }
    }
  }, [])

  if (hasError) {
    return (
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-gray-900 to-black"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
    )
  }

  return (
    <>
      {isLoading && (
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-gray-900 to-black animate-pulse"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
      )}
      <div
        ref={containerRef}
        data-blackhole-container
        className="absolute inset-0 pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'transparent',
          overflow: 'hidden',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
        }}
      />
    </>
  )
}
