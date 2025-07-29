import { Box, Card, CardContent, Grid } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { OverviewResult } from '../type'
import { durationConvert } from 'utils/old/utility'
import { isEmpty } from 'lodash'
import { Loading } from 'components/Loading'

type BasicViewSystemProps = {
  title: string
  result: OverviewResult
}

export const BasicViewSystem = ({ title, result }: BasicViewSystemProps) => {
  return (
    <Card>
      <CardHeader title={title} />

      {isEmpty(result) ? (
        <Loading />
      ) : (
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Box>Hostname</Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box>{result?.hostname}</Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>Firmware Version</Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box>{result?.fwver}</Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>Local Time</Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box>{result?.localtime}</Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>Uptime</Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box>{result?.uptime ? durationConvert(result?.uptime) : ''}</Box>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  )
}
