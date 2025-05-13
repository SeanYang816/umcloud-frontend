import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

export const Error404 = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleJump = () => {
    navigate(-1)
  }

  return (
    <div>
      <h1>不好意思，找不到{location.pathname}</h1>
      <Button variant='contained' color='primary' onClick={handleJump}>
        返回
      </Button>
    </div>
  )
}
