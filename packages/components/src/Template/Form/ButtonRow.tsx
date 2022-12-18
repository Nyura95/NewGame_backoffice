import React from 'react'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const ButtonRow: React.FC<IProps> = ({ children, className }) => (
  <div className={`button-row d-flex mt-4${className ? ` ${className}` : ''}`}>{children}</div>
)
