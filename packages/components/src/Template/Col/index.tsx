import React from 'react'

type SizeColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface IProps {
  auto?: boolean
  children?: React.ReactNode
  className?: string
  col?: SizeColumn
  id?: string
  lg?: SizeColumn
  md?: SizeColumn
  sx?: SizeColumn
  xl?: SizeColumn
  xxl?: SizeColumn
}

export const Col: React.FC<IProps> = ({
  auto,
  id,
  children,
  col,
  lg,
  md,
  sx,
  xl,
  xxl,
  className,
}) => {
  return (
    <div
      id={id}
      className={`${auto ? 'col-auto' : ''}${col ? `col-${col}` : ''} ${lg ? `col-lg-${lg}` : ''} ${
        md ? `col-md-${md}` : ''
      } ${sx ? `col-sx-${sx}` : ''} ${xl ? `col-xl-${xl}` : ''} ${xxl ? `col-xxl-${xxl}` : ''} ${
        className ? className : ''
      }`}>
      {children}
    </div>
  )
}
