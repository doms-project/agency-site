'use client'

/**
 * CSSGlowBackground - A lightweight CSS-only alternative to particle animations
 * 
 * This component creates a smooth, ambient glow effect using pure CSS,
 * similar to dumodigital.com's background. Zero JavaScript animation,
 * minimal GPU usage, and smooth performance on all devices.
 */

export default function CSSGlowBackground({ 
  variant = 'default',  // 'default', 'subtle', 'vibrant', 'aurora'
  animated = true,      // Enable subtle CSS animation
  className = '',
}) {
  const variants = {
    default: {
      primary: 'rgba(59, 130, 246, 0.35)',    // Blue - more visible
      secondary: 'rgba(147, 51, 234, 0.25)',  // Purple - more visible
      accent: 'rgba(6, 182, 212, 0.2)',       // Cyan - more visible
    },
    subtle: {
      primary: 'rgba(59, 130, 246, 0.08)',
      secondary: 'rgba(147, 51, 234, 0.05)',
      accent: 'rgba(6, 182, 212, 0.04)',
    },
    vibrant: {
      primary: 'rgba(59, 130, 246, 0.25)',
      secondary: 'rgba(147, 51, 234, 0.18)',
      accent: 'rgba(6, 182, 212, 0.12)',
    },
    aurora: {
      primary: 'rgba(34, 197, 94, 0.12)',     // Green
      secondary: 'rgba(168, 85, 247, 0.15)',  // Purple
      accent: 'rgba(56, 189, 248, 0.1)',      // Sky blue
    },
  }

  const colors = variants[variant] || variants.default

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    >
      {/* Base dark gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)',
        }}
      />
      
      {/* Primary glow - center top */}
      <div 
        className={`absolute w-[800px] h-[800px] rounded-full ${animated ? 'animate-glow-pulse' : ''}`}
        style={{
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      
      {/* Secondary glow - left side */}
      <div 
        className={`absolute w-[600px] h-[600px] rounded-full ${animated ? 'animate-glow-drift' : ''}`}
        style={{
          top: '30%',
          left: '-10%',
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      
      {/* Accent glow - right side */}
      <div 
        className={`absolute w-[500px] h-[500px] rounded-full ${animated ? 'animate-glow-float' : ''}`}
        style={{
          top: '50%',
          right: '-5%',
          background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
          filter: 'blur(90px)',
        }}
      />
      
      {/* Bottom ambient glow */}
      <div 
        className="absolute w-full h-[400px]"
        style={{
          bottom: 0,
          background: `radial-gradient(ellipse at center bottom, ${colors.primary} 0%, transparent 60%)`,
          filter: 'blur(60px)',
          opacity: 0.5,
        }}
      />
      
      {/* Subtle noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}


