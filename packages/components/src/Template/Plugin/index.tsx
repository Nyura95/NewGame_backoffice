import React, { useMemo } from 'react'

import ReactDOM from 'react-dom'

import { NameIcon } from '../enum'
import { Icon } from '../Icon'

interface IProps {
  children?: React.ReactNode
  icon?: NameIcon
  id: string
  onClickIcon?: () => void
  open?: boolean
}

const FPlugin: React.FC<IProps> = ({ children, icon, onClickIcon, open }) => {
  return (
    <div className={`fixed-plugin${open ? ' show' : ''}`}>
      {icon ? (
        <div
          className="fixed-plugin-button text-dark position-fixed px-3 py-2"
          onClick={onClickIcon}>
          <Icon className="py-2" icon={icon} />
        </div>
      ) : null}
      {children}
    </div>
  )
}

export const Plugin: React.FC<IProps> = props => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const container = useMemo(() => document.getElementById(props.id), [])
  if (container) return ReactDOM.createPortal(<FPlugin {...props} />, container)

  return null
}
