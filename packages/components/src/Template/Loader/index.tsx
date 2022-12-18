import React from 'react'

import { TypeColor } from '../enum'

interface IProps {
  color?: TypeColor
  show?: boolean
}

export const Loader: React.FC<IProps> = ({ color = TypeColor.primary, show = false }) => {
  return (
    <div
      className={`abolute-center-item z-index2 mask bg-gradient-dark opacity-${show ? '6' : '0'}`}>
      <div
        className={`spinner-grow absolute-center-translate text-${color}`}
        style={{ transform: 'initial' }}
        role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
