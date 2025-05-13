import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import { genChannelId, genRequestId } from 'utils/reg'
import { DefaultRootStateProps } from 'types'
import { TotalClientDevice } from './chartView/TotalClientDevice'
import { RecentActivities } from './chartView/RecentActivities'
import { QuickLook } from './chartView/QuickLook'

export const Dashboard = () => {
  const token = useSelector(
    (state: DefaultRootStateProps) => state.authentication.token,
  )
  const wsUrl = useMemo(() => {
    return `${import.meta.env.VITE_APP_WS_BACKEND_URI}?token=${token}`
  }, [token])
  const spacing = 3
  const data = {
    data: {
      channel: genChannelId(),
      requestId: genRequestId(),
      token: token,
    },
  }

  return (
    <>
      <Grid container spacing={spacing} mb={spacing}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TotalClientDevice data={data} wsUrl={wsUrl} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <QuickLook data={data} wsUrl={wsUrl} spacing={spacing} />
        </Grid>
      </Grid>

      <Grid container spacing={spacing}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecentActivities data={data} wsUrl={wsUrl} spacing={spacing} />
        </Grid>
      </Grid>
    </>
  )
}
