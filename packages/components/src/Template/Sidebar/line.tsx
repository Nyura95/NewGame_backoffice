import React from 'react'

import { ColorText } from '../enum'

interface IProps {
  children?: React.ReactNode
  colorText?: ColorText
}

export const Line: React.FC<IProps> = ({ children, colorText = ColorText.white }) => {
  return (
    <li className="nav-item mt-3">
      <h6 className={`ps-4  ms-2 text-uppercase text-xs font-weight-bolder ${colorText}`}>
        {children}
      </h6>
    </li>
  )
}
