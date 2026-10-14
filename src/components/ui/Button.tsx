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
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      'text-white font-semibold',
      'shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30'
    ),
    outline: clsx(
      'border-2 border-slate-300 dark:border-slate-700',
      'text-slate-800 dark:text-slate-200 font-semibold',
      'hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400',
      'hover:bg-blue-50/50 dark:hover:bg-blue-950/20'
    ),
    ghost: clsx(
      'text-slate-700 dark:text-slate-300 font-medium',
      'hover:bg-slate-100 dark:hover:bg-slate-800/60',
      'active:bg-slate-200 dark:active:bg-slate-800'
    ),
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  }

  const Component = href ? motion.a : motion.button

  // Block javascript: URLs — defense-in-depth if href ever comes from dynamic data.
  const safeHref = href && /^javascript:/i.test(href) ? '#' : href

  // When opening in a new tab, always enforce noopener noreferrer to prevent
  // tabnabbing even if the caller omits the rel prop.
  const safeRel =
    target === '_blank'
      ? ['noopener', 'noreferrer', ...(rel ?? '').split(' ').filter(Boolean)].join(' ')
      : rel

  return (
    <Component
      {...(safeHref ? { href: safeHref, target, rel: safeRel } : { type })}
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
