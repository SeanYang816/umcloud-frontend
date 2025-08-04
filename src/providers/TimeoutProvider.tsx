import { ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authLogout } from 'reducers/bgw5105/authentication'

export function TimeoutProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    const handleWindowEvents = () => {
      clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        dispatch(authLogout())
        navigate('/login')
      }, window.__CONFIG__.VITE_IDLE_LOGOUT_TIMEOUT_MINUTES * 60000)
    }

    window.addEventListener('mousemove', handleWindowEvents)
    window.addEventListener('keydown', handleWindowEvents)
    window.addEventListener('click', handleWindowEvents)

    handleWindowEvents()

    return () => {
      window.removeEventListener('mousemove', handleWindowEvents)
      window.removeEventListener('keydown', handleWindowEvents)
      window.removeEventListener('click', handleWindowEvents)
    }
  }, [dispatch, navigate])

  return children
}
