import React from 'react'

import { NameIcon } from '../enum'

interface IProps {
  active?: boolean
  children?: React.ReactNode
  icon?: NameIcon
  onClick?: () => void
}

export const Item: React.FC<IProps> = ({ active, children, icon, onClick }) => {
  return (
    <li className="nav-item" role="presentation" onClick={onClick}>
      <a
        className={`nav-link mb-0 px-0 py-1${active ? ' active bg-white' : ''}`}
        data-bs-toggle="tab"
        role="tab"
        aria-selected="true">
        {icon && <i className="material-icons text-lg position-relative">{icon}</i>}
        <span className="ms-1">{children}</span>
      </a>
    </li>
  )
}
