import React from 'react'

import { ColorButton, NameIcon, SizeButton } from '../enum'
import { Icon } from '../Icon'
import { Dropdown } from './Dropdown'

interface IProps {
  active?: boolean
  block?: boolean
  busy?: boolean
  children?: React.ReactNode
  className?: string
  color?: ColorButton
  disabled?: boolean
  gradient?: boolean
  icon?: NameIcon
  iconOnly?: boolean
  onClick?: () => void
  outline?: boolean
  size?: SizeButton
  type?: 'button' | 'submit' | 'reset'
}

const Simple: React.FC<IProps> = ({
  children,
  onClick,
  className,
  color = ColorButton.primary,
  icon,
  gradient,
  outline,
  size,
  block,
  disabled,
  active,
  busy,
  iconOnly,
  type = 'button',
}) => {
  return (
    <button
      disabled={disabled || busy}
      className={`btn bg${gradient ? '-gradient' : ''}${outline ? '-outline' : ''}-${color} ${
        className ? ` ${className}` : ''
      } ${size ? size : ''}${block ? ' w-100' : ''}${active ? ' active' : ''} ${
        icon ? ' btn-icon' : ''
      }${iconOnly ? ' btn-icon-only' : ''}`}
      type={type}
      onClick={onClick}>
      {icon ? (
        <span
          className="btn-inner--icon  absolute-center-translate"
          style={{ opacity: busy ? 0 : 1 }}>
          <Icon icon={icon} />
        </span>
      ) : null}
      <span className={`${icon ? 'btn-inner--text' : ''}`} style={{ opacity: busy ? 0 : 1 }}>
        {children}
      </span>
      {busy ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        </div>
      ) : null}
    </button>
  )
}

export const Button = Object.assign(Simple, {
  Dropdown: Dropdown,
})
