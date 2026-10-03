import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  href?: string
  target?: string
  rel?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  isLoading,
  loadingText,
  type = 'button',
  onClick,
  href,
  target,
  rel,
}) => {
  const variantStyles = {
    primary: clsx(
      'bg-gradient-to-r from-primary-600 to-primary-500',
      'text-white font-semibold',
      'shadow-lg shadow-primary-500/25',
      'hover:shadow-xl hover:shadow-primary-500/30',
      'hover:from-primary-500 hover:to-primary-400',
      'active:from-primary-700 active:to-primary-600',
      'dark:from-primary-500 dark:to-accent-cyan-500',
      'dark:shadow-primary-500/20',
      'dark:hover:shadow-primary-500/30'
    ),
    outline: clsx(
      'border-2 border-primary-500/40',
      'text-primary-600 dark:text-primary-400',
      'hover:bg-primary-50 hover:border-primary-500/60',
      'dark:hover:bg-primary-950/30 dark:hover:border-primary-400/50',
      'active:bg-primary-100 dark:active:bg-primary-950/50'
    ),
    ghost: clsx(
      'text-gray-700 dark:text-gray-300',
      'hover:bg-gray-100 dark:hover:bg-white/5',
      'active:bg-gray-200 dark:active:bg-white/10'
    ),
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      {...(href ? { href, target, rel } : { type })}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={clsx(
        'btn-base',
        variantStyles[variant],
        sizes[size],
        {
          'pointer-events-none opacity-50': disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? (
        <>
          <svg
            className="-ms-1 me-2 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText ?? 'Sending...'}
        </>
      ) : (
        children
      )}
    </Component>
  )
}
