import { config } from 'config'
import { MainLayout } from 'layouts/MainLayout'
import { Error404 } from 'pages/Error404'
import { Login } from 'pages/login'
import { Route, Routes as RouterRoutes, useNavigate } from 'react-router-dom'
import { routePermissions } from './routePermissions'
import { boardType } from 'constant/things'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { useEffect } from 'react'
import { BGW5105 } from 'pages/things/bgw5105'
import { XPB510 } from 'pages/things/xpb510'

export function Routes() {
  const { isAuthenticated, token } = useSelector(
    (state: RootStateProps) => state.bgw5105.authentication,
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
        <Route path={`things/${boardType.bgw5105}`} element={<BGW5105 />} />
        <Route path={`things/${boardType.xpb506}`} element={<XPB510 />} />
        <Route path='*' element={<Error404 />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </RouterRoutes>
  )
}
