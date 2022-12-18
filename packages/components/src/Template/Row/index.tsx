import React from 'react'

interface IProps {
  center?: boolean
  children?: React.ReactNode
  className?: string
}

export const Row: React.FC<IProps> = ({ center, children, className }) => {
  return (
    <div
      className={`row${className ? ` ${className}` : ''}${
        center ? ' justify-content-md-center' : ''
      }`}>
      {children}
    </div>
  )
}
