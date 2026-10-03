import { useState, ChangeEvent, FormEvent } from 'react'
import { interpolate } from '@/i18n'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
}

interface FieldValidation {
  [key: string]: ValidationRules
}

interface FormErrors {
  [key: string]: string
}

export interface ValidationMessages {
  required: string
  email: string
  minLength: string
  maxLength: string
  pattern: string
}

export interface UseFormOptions {
  messages?: Partial<ValidationMessages>
  fieldLabels?: Record<string, string>
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: FieldValidation,
  options: UseFormOptions = {}
) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { messages, fieldLabels } = options

  const validateField = (name: string, value: any): string => {
    const rules = validationRules[name]
    if (!rules) return ''

    if (rules.required && !value) {
      const label = fieldLabels?.[name] ?? name.charAt(0).toUpperCase() + name.slice(1)
      return interpolate(messages?.required ?? '{field} is required', { field: label })
    }

    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return messages?.email ?? 'Please enter a valid email address'
      }
    }

    if (rules.minLength && value.length < rules.minLength) {
      return interpolate(messages?.minLength ?? 'Minimum {count} characters required', {
        count: rules.minLength,
      })
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return interpolate(messages?.maxLength ?? 'Maximum {count} characters allowed', {
        count: rules.maxLength,
      })
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return messages?.pattern ?? 'Invalid format'
    }

    return ''
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, values[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (callback: (values: T) => Promise<void> | void) => {
    return async (e: FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      if (validate()) {
        try {
          await callback(values)
          // Reset form on success
          setValues(initialValues)
          setErrors({})
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }

      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}