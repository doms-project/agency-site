'use client'

export default function LightweightHeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Rich dark base */}
      <div className="absolute inset-0 bg-[#000000]" />
      
      {/* Stripe-style liquid gradient mesh - adapted to blue/teal palette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123, 185, 232, 0.25), transparent 60%),
            radial-gradient(ellipse 60% 50% at 100% 40%, rgba(74, 144, 226, 0.2), transparent 60%),
            radial-gradient(ellipse 70% 60% at 0% 60%, rgba(95, 166, 214, 0.22), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 100%, rgba(107, 168, 216, 0.15), transparent 60%)
          `,
        }}
      />
      
      {/* Animated liquid gradient blobs - Stripe style */}
      <div className="absolute inset-0">
        {/* Large morphing blob - top left */}
        <div 
          className="absolute"
          style={{
            width: '1400px',
            height: '900px',
            top: '-30%',
            left: '-15%',
            background: 'radial-gradient(ellipse, rgba(123, 185, 232, 0.35) 0%, rgba(95, 166, 214, 0.2) 30%, rgba(74, 144, 226, 0.1) 50%, transparent 75%)',
            filter: 'blur(100px)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            animation: 'liquidMorph1 18s ease-in-out infinite alternate',
            opacity: 0.9,
          }}
        />
        
        {/* Medium blob - right */}
        <div 
          className="absolute"
          style={{
            width: '1200px',
            height: '800px',
            top: '20%',
            right: '-20%',
            background: 'radial-gradient(ellipse, rgba(74, 144, 226, 0.3) 0%, rgba(95, 166, 214, 0.18) 35%, rgba(107, 168, 216, 0.1) 55%, transparent 75%)',
            filter: 'blur(90px)',
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 60%',
            animation: 'liquidMorph2 22s ease-in-out infinite alternate',
            opacity: 0.85,
          }}
        />
        
        {/* Bottom blob - left */}
        <div 
          className="absolute"
          style={{
            width: '1100px',
            height: '750px',
            bottom: '-25%',
            left: '10%',
            background: 'radial-gradient(ellipse, rgba(95, 166, 214, 0.28) 0%, rgba(123, 185, 232, 0.16) 30%, rgba(74, 144, 226, 0.08) 55%, transparent 75%)',
            filter: 'blur(85px)',
            borderRadius: '50% 50% 30% 70% / 60% 40% 70% 50%',
            animation: 'liquidMorph3 25s ease-in-out infinite alternate',
            opacity: 0.75,
          }}
        />
        
        {/* Accent blob - center */}
        <div 
          className="absolute"
          style={{
            width: '900px',
            height: '900px',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(107, 168, 216, 0.25) 0%, rgba(123, 185, 232, 0.12) 30%, rgba(74, 144, 226, 0.06) 50%, transparent 70%)',
            filter: 'blur(75px)',
            borderRadius: '45% 55% 60% 40% / 50% 45% 55% 50%',
            animation: 'liquidPulse 20s ease-in-out infinite',
            opacity: 0.65,
          }}
        />
      </div>
      
      {/* Subtle grid with fade */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123, 185, 232, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 185, 232, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
          mask: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMask: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
        }}
      />
      
      {/* Depth vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />
      
      <style jsx>{`
        @keyframes liquidMorph1 {
          0% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          50% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(8%, -5%) rotate(3deg) scale(1.08);
          }
          100% {
            border-radius: 30% 70% 50% 50% / 50% 60% 40% 60%;
            transform: translate(-5%, 3%) rotate(-2deg) scale(1.05);
          }
        }
        
        @keyframes liquidMorph2 {
          0% {
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%;
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          50% {
            border-radius: 40% 60% 60% 40% / 70% 30% 60% 40%;
            transform: translate(-6%, 7%) rotate(-4deg) scale(1.1);
          }
          100% {
            border-radius: 50% 50% 40% 60% / 40% 70% 50% 60%;
            transform: translate(4%, -4%) rotate(2deg) scale(1.06);
          }
        }
        
        @keyframes liquidMorph3 {
          0% {
            border-radius: 50% 50% 30% 70% / 60% 40% 70% 50%;
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          50% {
            border-radius: 70% 30% 60% 40% / 30% 70% 50% 60%;
            transform: translate(-7%, -6%) rotate(5deg) scale(1.12);
          }
          100% {
            border-radius: 40% 60% 50% 50% / 60% 50% 40% 70%;
            transform: translate(5%, 5%) rotate(-3deg) scale(1.07);
          }
        }
        
        @keyframes liquidPulse {
          0%, 100% {
            border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 0.65;
          }
          33% {
            border-radius: 55% 45% 40% 60% / 60% 50% 40% 50%;
            transform: translate(-50%, -50%) scale(1.15) rotate(120deg);
            opacity: 0.8;
          }
          66% {
            border-radius: 50% 50% 50% 50% / 45% 55% 60% 40%;
            transform: translate(-50%, -50%) scale(0.95) rotate(240deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
