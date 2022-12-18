import React from 'react'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const Body: React.FC<IProps> = ({ children, className }) => {
  return <div className={`card-body p-3 ${className ? className : ''}`}>{children}</div>
}
