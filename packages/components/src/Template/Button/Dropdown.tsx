import React, { useCallback, useState } from 'react'

import { ColorButton } from '../enum'

interface IProps {
  children?: React.ReactNode
  className?: string
  color?: ColorButton
  disabled?: boolean
  id: string
  items?: {
    label: string
    value: string | number
  }[]
  onClick?: (value: string | number) => void
}

export const Dropdown: React.FC<IProps> = ({
  children,
  className = '',
  color = ColorButton.primary,
  disabled = false,
  id,
  items = [],
  onClick,
}) => {
  const [down, setDown] = useState(false)

  const click = useCallback(
    (value: string | number) => {
      if (onClick) onClick(value)
      setDown(false)
    },
    [onClick],
  )

  return (
    <div className="dropdown">
      <button
        className={`btn btn-${color} dropdown-toggle${down ? ' show' : ''}${
          className ? ` ${className}` : ''
        }`}
        type="button"
        id={id}
        data-bs-toggle="dropdown"
        aria-expanded={down}
        disabled={disabled}
        onClick={() => setDown(!down)}>
        {children}
      </button>
      <ul
        className={`dropdown-menu${down ? ' show' : ''}`}
        aria-labelledby={id}
        onMouseLeave={() => setDown(false)}>
        {items.map((x, k) => (
          <li key={k} onClick={() => click(x.value)}>
            <a className="dropdown-item">{x.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
