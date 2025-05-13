import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  Box,
} from '@mui/material'
import { CUSTOM_OPTION } from 'constant'
import { ErrorMessage } from 'components/ErrorMessage'
import { TextField } from './TextField'
import { SelectOptionProps } from 'types'
import { HelperText } from 'components/extends/HelperText'

type SelectProps = {
  value: string
  options: SelectOptionProps[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  displayEmpty?: boolean
  id?: string
  label?: React.ReactNode
  name?: string
  fullWidth?: boolean
  helperText?: string | boolean | undefined
  errorMessage?: string | boolean | undefined
  isLabelHolder?: boolean
} & MuiSelectProps

export const Select: React.FC<SelectProps> = ({
  isLabelHolder = false,
  displayEmpty = true,
  label,
  options = [],
  fullWidth = true,
  helperText,
  errorMessage,
  onChange,
  ...props
}) => {
  const [text, setText] = useState('')
  const [isCustomOption, setCustomOption] = useState(false)

  const isCustom = props.value === CUSTOM_OPTION

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleInputBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (text) {
      const blurredValue = e.target.value
      onChange({
        target: { name: props.name, value: blurredValue },
      } as React.ChangeEvent<HTMLInputElement>)
    } else {
      setCustomOption(false)
    }
  }

  useEffect(() => {
    if (isCustom) {
      setCustomOption(true)
    }
  }, [isCustom])

  return (
    <Box sx={{ minWidth: '120px' }}>
      {label && <InputLabel>{label}</InputLabel>}
      {!isLabelHolder && (
        <FormControl
          fullWidth={fullWidth}
          sx={{ margin: '0 0 24px', padding: '8px 0 0' }}
        >
          {!isCustomOption && !text ? (
            <MuiSelect
              displayEmpty={displayEmpty}
              {...props}
              onChange={onChange}
              size='small'
            >
              {options.map((item) => {
                if (props.value === CUSTOM_OPTION) {
                  onChange({
                    target: { name: props.name, value: '' },
                  } as React.ChangeEvent<HTMLInputElement>)
                }

                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                )
              })}
            </MuiSelect>
          ) : (
            <TextField
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              errorMessage={errorMessage}
              size='small'
            />
          )}
          {helperText && <HelperText>{helperText}</HelperText>}
          {!isCustomOption && errorMessage && (
            <ErrorMessage message={errorMessage} />
          )}
        </FormControl>
      )}
    </Box>
  )
}
