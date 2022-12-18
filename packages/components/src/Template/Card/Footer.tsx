import React from 'react'

interface IProps {
  children?: React.ReactNode
  className?: string
  flex?: boolean
}

export const Footer: React.FC<IProps> = ({ flex, children, className }) => {
  return (
    <div className={`card-footer${flex ? ' d-flex' : ''} ${className ? className : ''}`}>
      {children}
    </div>
  )
}
