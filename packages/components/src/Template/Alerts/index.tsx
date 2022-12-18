import React from 'react'

import { TypeAlert } from '../enum'

interface IProps {
  children?: React.ReactNode
  onClick?: () => void
  title?: string
  type?: TypeAlert
}

export const Alerts: React.FC<IProps> = ({
  children,
  title,
  onClick,
  type = TypeAlert.primary,
}) => {
  return (
    <div className={`alert alert-${type} text-white`} role="alert" onClick={onClick}>
      {title && <strong>{title}!</strong>}
      {` `}
      {children}
    </div>
  )
}
