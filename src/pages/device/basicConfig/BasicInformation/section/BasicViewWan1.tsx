import { Box, Card, CardContent, Grid } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { durationConvert } from 'utils/old/utility'
import { OverviewResult } from '../type'
import { isNil } from 'lodash'
import { Loading } from 'components/Loading'

type BasicViewWan1Props = {
  title: string
  result: OverviewResult
}

// TODO: 0501 WAN 基本顯示
export const BasicViewWan1 = ({ title, result }: BasicViewWan1Props) => {
  const wan = result?.wan ?? {}
  const isUpWan = wan?.is_up
  const wan6 = result?.wan6 ?? {}
  const isUpWan6 = wan6?.is_up
  const isLoading = isNil(isUpWan) && isNil(isUpWan6)

  return (
    <Card>
      <CardHeader title={title} />
      {isLoading ? (
        <Loading />
      ) : (
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}> IPv4 Status </Grid>

            {!isUpWan ? (
              <Grid size={{ xs: 6 }}>Not connected</Grid>
            ) : (
              <Grid size={{ xs: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}> Type </Grid>
                  <Grid size={{ xs: 6 }}>{wan.proto}</Grid>

                  <Grid size={{ xs: 6 }}>Address</Grid>
                  <Grid size={{ xs: 6 }}>{wan.ipaddr}</Grid>

                  <Grid size={{ xs: 6 }}>Netmask</Grid>
                  <Grid size={{ xs: 6 }}>{wan.netmask}</Grid>

                  <Grid size={{ xs: 6 }}>Gateway</Grid>
                  <Grid size={{ xs: 6 }}>{wan.gwaddr}</Grid>

                  <Grid size={{ xs: 6 }}>DNS 1</Grid>
                  <Grid size={{ xs: 6 }}>{wan.dns}</Grid>

                  <Grid size={{ xs: 6 }}>Connected</Grid>
                  <Grid size={{ xs: 6 }}>
                    {wan.uptime ? durationConvert(wan.uptime) : ''}{' '}
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 6 }}>
              <Box>IPv6 Status</Box>
            </Grid>
            {!isUpWan6 ? (
              <Grid size={{ xs: 6 }}>
                <Box>Not connected</Box>
              </Grid>
            ) : (
              <Grid size={{ xs: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>Address</Grid>
                  <Grid size={{ xs: 6 }}>{wan6.ip6addr}</Grid>

                  <Grid size={{ xs: 6 }}>Gateway</Grid>
                  <Grid size={{ xs: 6 }}>{wan6.gw6addr}</Grid>

                  <Grid size={{ xs: 6 }}>
                    <Box>DNS 1</Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    {/* <Box>{wan6.dns[0]}</Box> */}
                    <Box>{wan6.dns}</Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>Connected</Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>{wan6.uptime ? durationConvert(wan6.uptime) : ''}</Box>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      )}
    </Card>
  )
}
