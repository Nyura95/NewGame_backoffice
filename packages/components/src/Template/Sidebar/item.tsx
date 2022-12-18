import React, { useCallback } from 'react'

import { ColorText } from '../enum'

interface IProps {
  colorText?: ColorText
  href?: string
  location?: string
  onClick?: (href: string) => void
  text?: string
}

//   // .sidenav[data-color="success"] .navbar-nav>.nav-item .nav-link.active+.collapse .nav-item.active .nav-link.active

export const Item: React.FC<IProps> = ({
  href = '#',
  onClick,
  text = 'Default',
  location,
  colorText = ColorText.white,
}) => {
  const click = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      onClick && onClick(href)
    },
    [href, onClick],
  )

  return (
    <li className={`nav-item${location === href ? ' active' : ''}`}>
      <a
        className={`nav-link ${colorText}${location === href ? ' active' : ''}`}
        href={href}
        role="button"
        onClick={click}>
        <span className="sidenav-mini-icon">{text.charAt(0)}</span>
        <span className="sidenav-normal  ms-2  ps-1">{text}</span>
      </a>
    </li>
  )
}
