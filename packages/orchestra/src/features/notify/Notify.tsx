import React, { useEffect, useMemo } from 'react'

import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Alerts } from '@cityscoot/components'

import { AppDispatch } from '../../app/store'
import { notifySelector, remove } from './notifySlice'
import { Container } from './styles'

export const Notifications: React.FC = () => {
  const notifications = useSelector(notifySelector.selectAll)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (notifications.length > 0) {
      const timeout = setTimeout(() => {
        dispatch(remove(notifications[0].hash || ''))
      }, 2000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [notifications, dispatch])

  return (
    <Container>
      {notifications.map((x, k: number) => (
        <Alerts
          key={k}
          title={x.title}
          type={x.type}
          onClick={() => x.hash && dispatch(remove(x.hash))}>
          {x.message}
        </Alerts>
      ))}
    </Container>
  )
}

const Notify: React.FC = () => {
  const container = useMemo(() => document.getElementById('notify'), [])
  if (container) return ReactDOM.createPortal(<Notifications />, container)

  return null
}

export default Notify
