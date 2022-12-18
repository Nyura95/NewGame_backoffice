import { useMemo } from 'react'

import { useSelector } from 'react-redux'

import { selectAuth } from '../features/auth/authSlice'

export const useAuth = () => {
  const { token } = useSelector(selectAuth)

  return useMemo(() => ({ token }), [token])
}
