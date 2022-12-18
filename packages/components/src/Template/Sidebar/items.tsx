import React, { useState } from 'react'

import { ColorText, NameIcon } from '../enum'

interface IProps {
  children?: React.ReactNode
  colorText?: ColorText
  icon?: NameIcon
  isOpen?: boolean
  onClick?: () => void
  text?: string
}

export const Items: React.FC<IProps> = ({
  children,
  icon,
  text = 'Default',
  onClick,
  colorText = ColorText.white,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={`nav-item${open ? ' active' : ''}`}>
      <a
        className={`nav-link ${colorText}${open ? ' active' : ''}`}
        role="button"
        data-bs-toggle="collapse"
        aria-expanded={open}
        onClick={() => {
          onClick && onClick()
          setOpen(prev => !prev)
        }}>
        {icon ? (
          <i className="material-icons-round opacity-10">{icon}</i>
        ) : (
          <span className="sidenav-mini-icon">{text.charAt(0)}</span>
        )}
        <span className="nav-link-text ms-2 ps-1">{text}</span>
      </a>
      <div className={`collapse${open ? ' show' : ''}`}>
        <ul className="nav">{children}</ul>
      </div>
    </li>
  )
}
