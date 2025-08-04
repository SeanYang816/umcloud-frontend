import React, { useCallback, useEffect, useRef, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import {
  TabMenuProps,
  basicConfigItems,
  firewallItems,
  algItems,
  routingItems,
  administratorItems,
  networkItems,
  wirelessItems,
  statusItems,
} from './menus'
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { isArray, isNull } from 'lodash'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import {
  updateApplyLoading,
  updateApplySetting,
  updateApplyStatus,
  updateRevertStatus,
  updateDataRefresher,
  updateShouldRefetchData,
} from 'reducers/bgw5105/config'
import { Button } from 'components/extends/Button'
import { DialogController } from 'components/DialogController'
import { toast } from 'react-toastify'

type DropdownProps = {
  index: number
  label: string
  items: TabMenuProps[]
  disabled?: boolean
}

type menuItemProps = {
  label: string
  component: React.ReactNode
}

export const XPB506: React.FC = () => {
  const dispatch = useDispatch()
  const { sendWsApplyChanges, sendWsGetMessage, sendWsRevertChanges } =
    useSendWsMessage()
  const result = useSelector(
    (state: RootStateProps) => state.bgw5105.config.dataChanges?.result,
  )
  const { sn, mac } = useSelector(
    (state: RootStateProps) => state.bgw5105.device.info,
  )
  const { status, setting } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.apply,
  )
  const { shouldRefetchData, dataRefresher } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.refetchData,
  )

  const [tabValue, setTabValue] = useState<number>(0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(
    basicConfigItems[0].component,
  )
  const [isReverting, setIsReverting] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRefreshRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTabChange = (
    _event: React.ChangeEvent<object>,
    newValue: number,
  ) => {
    setTabValue(newValue)
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (item: menuItemProps) => {
    setCurrentPage(item.component)
    handlePopoverClose()
  }

  const handleApply = () => {
    sendWsApplyChanges()
    dispatch(updateApplyLoading(true))
  }

  const handleRevert = () => {
    sendWsRevertChanges()
    setIsReverting(true)
  }

  const handleShouldRefetchData = () => {
    dispatch(updateShouldRefetchData(!shouldRefetchData))
  }

  const tabItems: DropdownProps[] = [
    { index: 0, label: 'Basic Configuration', items: basicConfigItems },
    { index: 1, label: 'Network', items: networkItems },
    { index: 2, label: 'Wireless', items: wirelessItems },
    { index: 3, label: 'Firewall', items: firewallItems },
    { index: 4, label: 'ALG', items: algItems },
    { index: 5, label: 'Routing', items: routingItems },
    { index: 6, label: 'Administrator', items: administratorItems },
    { index: 7, label: 'Status', items: statusItems },
  ]

  const selectedMenu =
    tabItems.find((item) => item.index === tabValue)?.items ?? tabItems[0].items

  const isChange = isArray(result?.changes)

  const unappliedChangesDataRaw = (
    isChange ? (result?.changes ?? []) : []
  ) as string[]

  const unappliedChangesData = unappliedChangesDataRaw
    .map((e) => e.replace(/<.*?>/g, '').trim())
    .filter((e) => e !== '')
  const unappliedChangesDataLength = unappliedChangesData.length
  const unappliedChangesButtonText = `unapplied changes: ${unappliedChangesDataLength}`

  const requestApplyStatus = useCallback(
    () => sendWsGetMessage(SERVER_ACTIONS.CONFIG_GET_APPLY_STATUS),
    [sendWsGetMessage],
  )

  useEffect(() => {
    if (shouldRefetchData) {
      intervalRefreshRef.current = setInterval(() => {
        dispatch(updateDataRefresher(!dataRefresher))
      }, window.__CONFIG__.VITE_AUTO_UPDATE_BUTTON_REFRESH_RATE_SECONDS * 1000)
    } else {
      if (intervalRefreshRef.current) {
        clearInterval(intervalRefreshRef.current)
      }
    }

    return () => {
      if (intervalRefreshRef.current) {
        clearInterval(intervalRefreshRef.current)
      }
    }
  }, [dataRefresher, dispatch, shouldRefetchData])

  useEffect(() => {
    // Check for changes
    sendWsGetMessage(SERVER_ACTIONS.CONFIG_GET_CHANGES)
  }, [sendWsGetMessage])

  const isApplySuccess =
    setting && setting.status === '0' && setting.msg === 'success'
  const isApplyFinish =
    status && status.status === '0' && status.msg === 'finish'

  useEffect(() => {
    if (isApplySuccess) {
      if (!status) {
        requestApplyStatus()
      } else if (!isApplyFinish) {
        intervalRef.current = setInterval(
          () => requestApplyStatus(),
          window.__CONFIG__.VITE_REFRESH_APPLY_STATUS_INTERVAL_SECONDS * 1000,
        )
      } else {
        toast.success('Apply Configured')
        dispatch(updateApplyLoading(false))
        dispatch(updateApplySetting(null))
        dispatch(updateApplyStatus(null))
        sendWsGetMessage(SERVER_ACTIONS.CONFIG_GET_CHANGES)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    dispatch,
    isApplyFinish,
    isApplySuccess,
    requestApplyStatus,
    sendWsGetMessage,
    status,
  ])

  const revertStatus = useSelector(
    (state: RootStateProps) => state.bgw5105.config.revertStatus,
  )
  useEffect(() => {
    // Revert
    if (isReverting && !isNull(revertStatus)) {
      if (revertStatus.msg === 'success' && revertStatus.status === '0') {
        setIsReverting(false)
        dispatch(updateRevertStatus(null))
      }
    }
  }, [dispatch, isReverting, revertStatus])

  return (
    <>
      <Stack gap={1}>
        <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ marginBottom: 0 }}
          >
            {tabItems.map((item) => (
              <Tab
                disabled={item?.disabled}
                key={item.label}
                label={item.label}
                onClick={handlePopoverOpen}
              />
            ))}
          </Tabs>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {selectedMenu.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleMenuItemClick(item)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Popover>
        </Paper>

        <Stack direction='row' gap={1.5}>
          <Button
            icon='apply'
            text='apply'
            disabled={!isChange}
            color='info'
            onClick={handleApply}
          />
          <DialogController>
            {({ open, onOpen, onClose }) => (
              <>
                <Button
                  text={unappliedChangesButtonText}
                  disabled={!isChange}
                  color='warning'
                  onClick={onOpen}
                />
                <Dialog fullWidth open={open} onClose={onClose}>
                  <DialogContent>
                    {unappliedChangesData.map((e) => (
                      <Box key={e}>{e}</Box>
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      icon='cancel'
                      text='back'
                      color='error'
                      onClick={onClose}
                    />
                    <Button
                      icon='apply'
                      text='apply'
                      disabled={!isChange}
                      color='info'
                      onClick={() => {
                        handleApply()
                        onClose()
                      }}
                    />
                    <Button
                      icon='revert'
                      text='revert'
                      disabled={!isChange}
                      color='warning'
                      onClick={() => {
                        handleRevert()
                        onClose()
                      }}
                    />
                  </DialogActions>
                </Dialog>
              </>
            )}
          </DialogController>
          <Button
            text={`Auto Refresh ${shouldRefetchData ? 'on' : 'off'}`}
            color={shouldRefetchData ? 'success' : 'secondary'}
            onClick={handleShouldRefetchData}
          />
        </Stack>

        {isReverting ? (
          <Box>
            <Typography>Reverting ...</Typography>
            <LinearProgress />
          </Box>
        ) : sn && mac ? (
          currentPage
        ) : null}
      </Stack>
    </>
  )
}
