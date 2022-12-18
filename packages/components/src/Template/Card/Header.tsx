import React from 'react'

import { IColumn, NameIcon, TypeColor } from '../enum'

interface IProps {
  children?: React.ReactNode
  className?: string
  colorIcon?: TypeColor
  icon?: NameIcon
}

const Head: React.FC<IProps> = ({ children, className = '', icon, colorIcon = TypeColor.info }) => {
  return (
    <div className={`card-header${className ? ` ${className}` : ''}${icon ? ' pt-3 pt-2' : ''}`}>
      {icon && (
        <div
          className={`icon icon-lg icon-shape bg-gradient-${colorIcon} shadow text-center border-radius-xl mt-n4 me-3 float-start`}>
          <i className="material-icons opacity-10">{icon}</i>
        </div>
      )}
      {children}
    </div>
  )
}

interface IPropsBg {
  children?: React.ReactNode
  className?: string
  color?: TypeColor
  pe?: IColumn
  py?: IColumn
}

const Bg: React.FC<IPropsBg> = ({
  children,
  className = '',
  py = 3,
  pe = 1,
  color = TypeColor.primary,
}) => {
  return (
    <div
      className={`bg-gradient-${color} shadow-${color} border-radius-lg py-${py} pe-${pe}${
        className ? ` ${className}` : ''
      }`}>
      {children}
    </div>
  )
}

interface IPropsTitle {
  children?: React.ReactNode
}

const Title: React.FC<IPropsTitle> = ({ children }) => {
  return (
    <div className="d-flex justify-content-between">
      <h6 className="mb-0">{children}</h6>
    </div>
  )
}

export const Header = Object.assign(Head, {
  Bg,
  Title,
})
