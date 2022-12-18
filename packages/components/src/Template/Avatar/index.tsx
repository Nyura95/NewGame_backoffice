import React from 'react'

interface IProps {
  image?: string
}

export const Avatar: React.FC<IProps> = ({ image }) => {
  return (
    <div className="avatar avatar-xl position-relative">
      <img src={image} className="w-100 border-radius-lg shadow-sm"></img>
    </div>
  )
}
