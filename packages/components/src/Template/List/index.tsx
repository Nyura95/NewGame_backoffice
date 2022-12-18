import React from 'react'

import { Li } from './Li'

interface IProps {
  children?: React.ReactNode
}

const Group: React.FC<IProps> = ({ children }) => {
  return <div className="list-group">{children}</div>
}

export const List = Object.assign(Group, {
  Li: Li,
})
