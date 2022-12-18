import React from 'react'

interface IProps {
  children?: React.ReactNode
}

export const Li: React.FC<IProps> = ({ children }) => {
  return <li className="list-group-item">{children}</li>
}
