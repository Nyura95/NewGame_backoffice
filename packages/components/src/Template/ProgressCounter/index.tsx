import React, { useEffect, useState } from 'react'

interface IProps {
  label?: string
  stop?: boolean
  timer: number
}

export const ProgressCounter: React.FC<IProps> = ({ label, stop = false, timer }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (stop) {
      setProgress(0)

      return
    }
    let i = 0
    const interval = setInterval(() => {
      if (i === 100) {
        clearInterval(interval)

        return
      }
      i = i + 100 / (timer / 1000)
      if (i < 100) return setProgress(i)
      clearInterval(interval)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [stop, timer])

  return (
    <div className="progress-wrapper">
      {label && (
        <div className="progress-info">
          <div className="progress-percentage">
            <span className="text-sm font-weight-normal">{`${progress}${label}`}</span>
          </div>
        </div>
      )}
      <div className="progress">
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
