import React from 'react'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const Group: React.FC<IProps> = ({ children, className }) => {
  return <div className={`card-group ${className ? className : ''}`}>{children}</div>
}
