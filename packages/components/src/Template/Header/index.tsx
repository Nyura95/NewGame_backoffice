import React from 'react'

import { TypeColor } from '../enum'

interface IProps {
  color?: TypeColor
  image: string
}

export const Header: React.FC<IProps> = ({ color = TypeColor.primary, image }) => {
  return (
    <div
      className="page-header min-height-300 border-radius-xl mt-4"
      style={{ backgroundImage: `url(${image})` }}>
      <span className={`mask  bg-gradient-${color}  opacity-6`}></span>
    </div>
  )
}
