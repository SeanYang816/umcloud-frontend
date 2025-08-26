import React, { forwardRef, useEffect, useMemo } from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
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
import { debounce, DebouncedFunc } from 'lodash'

export const icons = {
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
} as const

export type IconKey = keyof typeof icons

type BaseProps = Omit<MuiButtonProps, 'startIcon' | 'onClick' | 'children'>

export type ButtonProps = BaseProps & {
  icon?: IconKey
  /** Simple label; if you need rich content, pass children instead. */
  text?: string
  children?: React.ReactNode
  /** Kept as `() => void` to avoid synthetic event pooling issues with debounce. */
  onClick?: () => void
  /** Debounce delay in ms (default: 200). */
  debounceMs?: number
  /** Set true to disable debouncing. */
  disableDebounce?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      icon,
      text,
      children,
      onClick,
      debounceMs = 200,
      disableDebounce = false,
      variant = 'contained',
      color = 'primary',
      ...muiProps
    },
    ref,
  ) {
    // Create/cancel debounced handler safely.
    const debounced: DebouncedFunc<() => void> | undefined = useMemo(() => {
      if (!onClick || disableDebounce) return undefined

      return debounce(onClick, debounceMs)
    }, [onClick, debounceMs, disableDebounce])

    useEffect(() => {
      return () => {
        debounced?.cancel()
      }
    }, [debounced])

    const clickHandler = debounced ? () => debounced() : onClick
    const StartIcon = icon ? icons[icon] : undefined

    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        startIcon={StartIcon ? <StartIcon fontSize='medium' /> : undefined}
        onClick={clickHandler}
        {...muiProps}
      >
        {text ?? children}
      </MuiButton>
    )
  },
)
