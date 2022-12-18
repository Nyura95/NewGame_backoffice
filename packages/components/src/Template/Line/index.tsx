import React from 'react'

interface IProps {
  className?: string
}

export const Line: React.FC<IProps> = ({ className }) => (
  <hr className={`horizontal my-1 light${className ? ` ${className}` : ''}`} />
)
