import React, { CSSProperties, useMemo } from 'react'

import { TypeColor } from '../enum'

interface IProps {
  className?: string
  color?: TypeColor
  onClick?: () => void
  stopAnimation?: boolean
  style?: CSSProperties
  tooltip?: string
  type?: 'border' | 'grow'
}

export const Spinner: React.FC<IProps> = ({
  className,
  type = 'border',
  color,
  onClick,
  style,
  stopAnimation,
  tooltip,
}) => {
  const animationStyle: CSSProperties = useMemo(() => {
    if (stopAnimation) {
      return { animation: 'none', opacity: 1 }
    }

    return {}
  }, [stopAnimation])

  return (
    <div
      onClick={onClick}
      className={`spinner-${type} ${color ? `text-${color}` : ''}${
        className ? ` ${className}` : ''
      }${onClick ? ' cursor-pointer' : ''}`}
      role="status"
      style={{ ...style, ...animationStyle }}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={tooltip}
      data-container="body"
      data-animation="true">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
