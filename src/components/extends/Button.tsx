import {
  AddRounded,
  AutorenewRounded,
  CheckRounded,
  CloseRounded,
  ConstructionRounded,
  DeleteRounded,
  DoneAllRounded,
  DownloadRounded,
  EditRounded,
  PowerSettingsNewRounded,
  SettingsPowerRounded,
  UndoRounded,
} from '@mui/icons-material'
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  Typography,
  Box,
} from '@mui/material'
import { debounce } from 'lodash'
import React, { useMemo } from 'react'

const icons = {
  add: AddRounded,
  save: CheckRounded,
  apply: DoneAllRounded,
  revert: UndoRounded,
  confirm: ConstructionRounded,
  delete: DeleteRounded,
  edit: EditRounded,
  cancel: CloseRounded,
  download: DownloadRounded,
  renew: AutorenewRounded,
  reset: SettingsPowerRounded,
  reboot: PowerSettingsNewRounded,
}

type ButtonProps<T extends keyof typeof icons> = {
  icon?: T // Assuming icon is a React component
  text: string
  onClick: () => void
} & MuiButtonProps

export const Button: React.FC<ButtonProps<keyof typeof icons>> = ({
  icon = '' as keyof typeof icons,
  text,
  onClick,
  ...muiButtonProps
}) => {
  const Icon = icons[icon] ?? Box

  const debouncedOnClick = useMemo(() => debounce(onClick, 200), [onClick])

  return (
    <MuiButton
      variant='contained'
      color='primary'
      onClick={debouncedOnClick}
      sx={{ padding: '2px 12px 2px 8px' }}
      {...muiButtonProps}
    >
      <Icon fontSize='medium' />
      <Typography fontWeight={900} ml={0.5}>
        {text}
      </Typography>
    </MuiButton>
  )
}
