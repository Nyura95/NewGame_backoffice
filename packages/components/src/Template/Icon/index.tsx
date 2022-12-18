import React from 'react'

import { NameIcon } from '../enum'

interface IProps {
  className?: string
  icon: NameIcon
  onClick?: () => void
  round?: boolean
}

export const Icon: React.FC<IProps> = ({ icon, onClick, className, round }) => {
  return (
    <i
      className={`material-icons${round ? '-round' : ''} ${className ? className : ''}`}
      onClick={onClick}>
      {icon}
    </i>
  )
}
