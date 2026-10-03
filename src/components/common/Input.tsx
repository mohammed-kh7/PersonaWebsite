import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const inputBaseStyles = clsx(
  'w-full rounded-xl px-4 py-3 transition-all duration-200',
  'focus:outline-none focus:ring-2',
  'placeholder:text-gray-400 dark:placeholder:text-gray-500'
)

const inputNormalStyles = clsx(
  'bg-white/60 dark:bg-white/5',
  'border border-gray-200 dark:border-white/10',
  'text-gray-900 dark:text-white',
  'focus:border-primary-500 focus:ring-primary-200',
  'dark:focus:border-primary-400 dark:focus:ring-primary-500/20'
)

const inputErrorStyles = clsx(
  'border-red-400 dark:border-red-500',
  'focus:border-red-500 focus:ring-red-200',
  'dark:focus:ring-red-500/20'
)

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && (
              <span className="ms-1 text-accent-pink-500">*</span>
            )}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              inputBaseStyles,
              error ? inputErrorStyles : inputNormalStyles,
              icon && 'ps-10',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.name}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${props.name}-error`}
            className="mt-1.5 text-sm text-red-500 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {props.required && (
              <span className="ms-1 text-accent-pink-500">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            inputBaseStyles,
            'resize-none',
            error ? inputErrorStyles : inputNormalStyles,
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.name}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${props.name}-error`}
            className="mt-1.5 text-sm text-red-500 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
