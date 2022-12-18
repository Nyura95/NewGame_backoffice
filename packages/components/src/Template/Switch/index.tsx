import React from 'react'

import { Item } from './item'

interface IProps {
  children?: React.ReactNode
}

export const Sw: React.FC<IProps> = ({ children }) => {
  return (
    <div className="nav-wrapper position-relative">
      <ul className="nav nav-pills nav-fill p-1 cursor-pointer" role="tablist">
        {children}
      </ul>
    </div>
  )
}

export const Switch = Object.assign(Sw, {
  Item: Item,
})
