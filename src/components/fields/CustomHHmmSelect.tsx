import React from 'react'
import {
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControl,
  Grid,
} from '@mui/material'

type CustomHHmmSelectProps = {
  disabled?: boolean
  name?: string
  label: string
  value?: string
  fullWidth?: boolean
  isEnd?: boolean // New prop to allow hours up to 24
  onChange?: (_name: string, _value: string) => void
}

export const CustomHHmmSelect: React.FC<CustomHHmmSelectProps> = ({
  disabled = false,
  name = '',
  label = '',
  value = '0000',
  fullWidth = true,
  isEnd = false, // Default to false if not provided
  onChange = () => {},
}) => {
  const maxHour = isEnd ? 24 : 23 // Set max hour to 24 when isEnd is true
  const hour = `${value[0]}${value[1]}`
  const minute = `${value[2]}${value[3]}`

  const handleHourChange = (text: string) => {
    onChange(name, `${text}${minute}`)
  }

  const handleMinuteChange = (text: string) => {
    onChange(name, `${hour}${text}`)
  }

  return (
    <Grid container>
      <Grid display='flex' alignItems='center'>
        <InputLabel sx={{ width: '92px' }}>{label}</InputLabel>

        <Box>
          <InputLabel>Hour</InputLabel>
          <FormControl
            fullWidth={fullWidth}
            sx={{ margin: '0 0 24px', padding: '8px 0 0' }}
          >
            <Select
              disabled={disabled}
              value={hour}
              onChange={(e) => handleHourChange(e.target.value)}
              sx={{ marginRight: '16px' }}
              size='small'
            >
              {Array.from({ length: maxHour + 1 }, (_, i) => (
                <MenuItem key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <InputLabel>Minute</InputLabel>
          <FormControl
            fullWidth={fullWidth}
            sx={{ margin: '0 0 24px', padding: '8px 0 0' }}
          >
            <Select
              disabled={disabled}
              value={minute}
              onChange={(e) => handleMinuteChange(e.target.value)}
              sx={{ marginRight: '16px' }}
              size='small'
            >
              {Array.from({ length: 60 }, (_, i) => (
                <MenuItem key={i} value={i.toString().padStart(2, '0')}>
                  {i.toString().padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}
