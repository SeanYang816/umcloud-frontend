import { FC } from 'react'
import {
  Avatar,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material'
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import { Edit } from '@mui/icons-material'
import { DialogController } from 'components/DialogController'
import { SampleGraph } from './graphs/SampleGraph'
import { formatDate } from 'date-fns'
import { ExternalDataSource } from 'types/xpb510/iot/iot'
import { ExternalDataType } from 'enums'
import { EditAliasDialog } from './EditAliasDialog'
import { cToF } from 'utils'

const tempColor = 'warning.main'

// Accept Date | string and treat "recent" as within 5 minutes
const isRecent = (date: Date | string) => {
  const t =
    typeof date === 'string'
      ? new Date(date).getTime()
      : new Date(date).getTime()

  return Date.now() - t < 5 * 60 * 1000
}

// Convert Fahrenheit (source) -> selected unit
const toDisplayTemp = (tempC: number, unit: 'C' | 'F') =>
  unit === 'C' ? tempC : cToF(tempC)

type SampleInfoProps = {
  unit: 'C' | 'F'
  data: ExternalDataSource
}

export const SampleInfo: FC<SampleInfoProps> = ({ unit, data }) => {
  const displayTemp = toDisplayTemp(data.latestTemperature, unit)
  const unitSymbol = `°${unit}`

  const updatedAtLabel = formatDate(
    new Date(data.updatedAt),
    'yyyy-MM-dd HH:mm:ss',
  )

  return (
    <Card variant='outlined'>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1.5}
          sx={{ mb: 2 }}
        >
          <DialogController>
            {({ open, onOpen, onClose }) => (
              <>
                <Stack spacing={0.25}>
                  <Stack direction='row' alignItems='center' gap={0.5}>
                    <Typography
                      variant='h6'
                      sx={{ fontWeight: 700, height: 24 }}
                    >
                      {data.alias}
                    </Typography>
                    <IconButton size='small' onClick={onOpen}>
                      <Edit fontSize='small' />
                    </IconButton>
                  </Stack>
                  <Typography variant='body2' color='text.secondary'>
                    Port Number: {data.portNumber}
                  </Typography>
                </Stack>
                {open && (
                  <EditAliasDialog data={data} open={open} onClose={onClose} />
                )}
              </>
            )}
          </DialogController>

          <Stack direction='row' alignItems='center' gap={1.25}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: isRecent(data.updatedAt)
                  ? 'success.main'
                  : 'error.main',
              }}
            />
            <Typography variant='body2' color='text.secondary'>
              Report Time: {updatedAtLabel}
            </Typography>
          </Stack>
        </Stack>

        {/* Top quick stats row */}
        <Paper
          variant='outlined'
          sx={{
            p: 1.25,
            borderRadius: 2,
            bgcolor: 'background.default',
            mb: 2.5,
          }}
        >
          <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1.5}>
            <DialogController>
              {({ open, onOpen, onClose }) => (
                <>
                  <Stack direction='row' alignItems='center' gap={1.25}>
                    <Avatar
                      variant='rounded'
                      sx={{ bgcolor: tempColor, cursor: 'pointer' }}
                      onClick={onOpen}
                    >
                      <ThermostatRoundedIcon sx={{ color: 'grey.100' }} />
                    </Avatar>
                    <Typography
                      variant='h6'
                      sx={{ color: tempColor, lineHeight: 1 }}
                    >
                      {displayTemp.toFixed(1)} {unitSymbol}
                    </Typography>
                  </Stack>

                  <Dialog
                    open={open}
                    onClose={onClose}
                    sx={{ '.MuiPaper-root': { minWidth: 800 } }}
                  >
                    <DialogContent>
                      <SampleGraph
                        alias={data.alias}
                        unit={unit}
                        type={ExternalDataType.TEMPERATURE}
                      />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </DialogController>

            <Stack direction='row' alignItems='center' gap={1.25}>
              <DialogController>
                {({ open, onOpen, onClose }) => (
                  <>
                    <Stack direction='row' alignItems='center' gap={1.25}>
                      <Avatar
                        variant='rounded'
                        sx={{ bgcolor: 'info.main' }}
                        onClick={onOpen}
                      >
                        <WaterDropRoundedIcon sx={{ color: 'grey.100' }} />
                      </Avatar>
                      <Typography
                        variant='h6'
                        color='info.main'
                        sx={{ lineHeight: 1 }}
                      >
                        {data.latestHumidity}%
                      </Typography>
                    </Stack>

                    <Dialog
                      open={open}
                      onClose={onClose}
                      sx={{ '.MuiPaper-root': { minWidth: 800 } }}
                    >
                      <DialogContent>
                        <SampleGraph
                          alias={data.alias}
                          unit={unit}
                          type={ExternalDataType.HUMIDITY}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </DialogController>
            </Stack>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  )
}
