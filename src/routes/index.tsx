import { config } from 'config'
import { MainLayout } from 'layouts/MainLayout'
import { Error404 } from 'pages/Error404'
import { Login } from 'pages/login'
import { Route, Routes as RouterRoutes, useNavigate } from 'react-router-dom'
import { routePermissions } from './routePermissions'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { useEffect } from 'react'
import { Device } from 'pages/device'

export function Routes() {
  const { isAuthenticated, token } = useSelector(
    (state: DefaultRootStateProps) => state.authentication,
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, token])

  return (
    <RouterRoutes>
      <Route path={config.defaultPath} element={<MainLayout />}>
        <Route index element={routePermissions?.[0].component} />
        {routePermissions.map((item) => (
          <Route key={item.id} path={item.path} element={item.component} />
        ))}
        <Route path='things/device' element={<Device />} />
        <Route path='*' element={<Error404 />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </RouterRoutes>
  )
}
