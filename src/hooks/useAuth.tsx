import { useDispatch } from 'react-redux'
import { getAuthToken } from 'api/axios'
import { authLogin, authLogout } from 'reducers/bgw5105/authentication'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { config } from 'config'

type JwtPayload = {
  email: string
  exp: number
  iat: number
  id: number
}

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const verifyToken = (token: string) => {
    if (!token) return false

    const decoded: JwtPayload = jwtDecode(token)

    if (decoded && typeof decoded.exp === 'number') {
      return decoded.exp > Date.now() / 1000
    }

    return false
  }

  const catchError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        dispatch(authLogout())
        console.error(axiosError)
        toast.error((axiosError.response.data as { message: string }).message)
      }
    } else {
      dispatch(authLogout())
      console.error('Unexpected error during login: ', error)
      toast.error('Unexpected error during login: ' + String(error))
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await getAuthToken(username, password)
      const access_token = await response.data.access_token

      if (access_token && verifyToken(access_token)) {
        dispatch(authLogin({ user: username, token: access_token }))
        toast.success('Logged In')
        navigate(config.defaultPath)
      } else {
        dispatch(authLogout())
        toast.error('Error: Invalid Token')
        navigate('/login')
      }
    } catch (error: unknown) {
      catchError(error)
      navigate('/login')
    }
  }

  const logout = () => {
    dispatch(authLogout())
    navigate('/login')
  }

  return { login, logout }
}
