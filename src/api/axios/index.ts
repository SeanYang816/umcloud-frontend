import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'

const getAuthToken = async (username: string, password: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BACKEND_URI}/auth/login`,
    {
      username,
      password,
    },
  )

  return response
}

export { getAuthToken }
