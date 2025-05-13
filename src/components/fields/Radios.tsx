import React from 'react'
import {
  Stack,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from '@mui/material'
import { SelectOptionProps } from 'types'

type CustomRadioProps = {
  label?: string
  helperText?: string
  options: SelectOptionProps[]
  direction?: 'horizontal' | 'vertical'
} & MuiRadioProps

export const Radios: React.FC<CustomRadioProps> = ({
  label = '',
  helperText,
  options,
  ...props
}) => {
  return (
    <Stack sx={{ margin: '0 0 16px' }}>
      <InputLabel sx={{ marginBottom: '-8px', paddingRight: '16px' }}>
        {label}
      </InputLabel>
      <FormControl>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {options.map(({ value, label }, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0',
                margin: '0 16px 0 0',
              }}
            >
              <MuiRadio
                {...props}
                checked={props.value === value}
                value={value}
                size='small'
                sx={{
                  padding: '0',
                  margin: '0 4px 0 0',
                }}
              />
              <Box sx={{ whiteSpace: 'nowrap' }}>{label}</Box>
            </Box>
          ))}
        </Box>
        {helperText && (
          <FormHelperText sx={{ margin: '3px 0 3px 12px', width: '100%' }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  )
}
