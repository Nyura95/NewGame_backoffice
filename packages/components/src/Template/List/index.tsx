import React from 'react'

import { Li } from './Li'

interface IProps {
  children?: React.ReactNode
}

const Group: React.FC<IProps> = ({ children }) => {
  return <ul className="list-group">{children}</ul>
}

export const List = Object.assign(Group, {
  Li: Li,
})
