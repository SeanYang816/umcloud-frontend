import { useEffect } from 'react'
import { PageHeader } from 'components/PageHeader'
import { Card, Grid, InputLabel, Stack } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { DisplayField } from 'components/fields'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { throttle } from 'lodash'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type PayloadType_backup = {
  exec: string
  backup: string
}

type PayloadType_reset = {
  exec: string
  reset: string
}

export const BackupFlashFirmware = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.administrator.backupFlashFirmware,
  )

  const handleGenerateArchive = throttle(() => {
    const payload: PayloadType_backup = {
      exec: '1',
      backup: '1',
    }
    sendWsSetMessage(
      XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_DOWNLOAD_CONFIGURATION_BACKUP,
      payload,
    )
  }, 3000)

  const handleResetArchive = () => {
    if (window.confirm('Are you sure you want to restart the device?')) {
      const payload: PayloadType_reset = {
        exec: '1',
        reset: 'reset',
      }
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_RESET_TO_DEFAULTS,
        payload,
      )
    }
  }

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_GET_FIRMWARE_VERSION)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader title='Flash operations' />

      <Stack gap={2}>
        <Card>
          <CardHeader title='Backup / Restore'>
            {
              'Click "Generate archive" to download a tar archive of the current configuration files.'
            }
            <br />
            {
              'To restore configuration files, you can upload a previously generated backup archive here.'
            }
            <br />
            {
              'To reset the firmware to its initial state, click "Perform reset".'
            }
          </CardHeader>
          <StyledCardContent>
            <Grid container display='grid'>
              <Grid mb={2}>
                <InputLabel>Download backup</InputLabel>
                <Button
                  icon='download'
                  text='generate archive'
                  onClick={handleGenerateArchive}
                />
              </Grid>
              <Grid>
                <InputLabel>Reset to defaults</InputLabel>
                <Button
                  icon='reset'
                  color='warning'
                  text='perform reset'
                  onClick={handleResetArchive}
                />
              </Grid>
            </Grid>
          </StyledCardContent>
        </Card>

        <Card>
          <CardHeader title='Online Firmware Upgrade' />
          <StyledCardContent>
            <DisplayField
              label='Current Version'
              text={data.version?.result || 'N/A'}
            />
          </StyledCardContent>
        </Card>
      </Stack>
    </>
  )
}
