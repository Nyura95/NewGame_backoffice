import React from 'react'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const Label: React.FC<IProps> = ({ children, className }) => {
  return <label className={className}>{children}</label>
}
