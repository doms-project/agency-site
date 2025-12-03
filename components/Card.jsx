'use client'

import { memo } from 'react'

/**
 * Standardized Card Component
 * Provides consistent styling across all card implementations
 */
function Card({ 
  children, 
  className = '', 
  hover = true,
  padding = 'default',
  onClick,
  ...props 
}) {
  const paddingClasses = {
    sm: 'p-4',
    default: 'p-6 md:p-8',
    lg: 'p-8 md:p-10'
  }

  return (
    <div
      className={`
        ${paddingClasses[padding]}
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#7BB9E8]/10' : ''}
        transition-all duration-300
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default memo(Card)

