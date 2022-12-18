import React from 'react'

interface IProps {
  children?: React.ReactNode
}

export const Container: React.FC<IProps> = ({ children }) => {
  return <div className="container-fluid py-4">{children}</div>
}
