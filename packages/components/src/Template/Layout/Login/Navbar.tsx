import React from 'react'

interface IProps {
  children?: React.ReactNode
  text: string
}

export const Navbar: React.FC<IProps> = ({ text }) => {
  return (
    <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4">
      <div className="container">
        <span className="navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white">{text}</span>
      </div>
    </nav>
  )
}
