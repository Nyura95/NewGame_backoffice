import React from 'react'

interface IProps {
  onChange?: (value: number) => void
}

export const Progress: React.FC<IProps> = ({}) => {
  return (
    <div className="progress-wrapper">
      <div className="progress-info">
        <div className="progress-percentage">
          <span className="text-sm font-weight-normal">60%</span>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar bg-primary" role="progressbar" style={{ width: 60 }} />
      </div>
    </div>
  )
}
