import React from 'react'
import clsx from 'clsx'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  strong?: boolean
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  as: Tag = 'div',
  strong = false,
}) => {
  return (
    <Tag
      className={clsx(
        strong ? 'glass-panel-strong' : 'glass-panel',
        className
      )}
    >
      {children}
    </Tag>
  )
}
