import React, { useState } from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material'

type CustomCheckboxProps = {
  disabled?: boolean
  label?: string
  helperText?: string
  value: string[]
  onClick: (value: string[]) => void
  options: { label: string; value: string; checked?: boolean }[] // Array of checkbox options
}

export const MultiCheckbox: React.FC<CustomCheckboxProps> = ({
  disabled = false,
  label = '',
  helperText,
  value,
  onClick,
  options,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value || [])

  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(() => {
        const newValue = selectedValues.filter((v) => v !== value)
        onClick(newValue)

        return newValue
      })
    } else {
      setSelectedValues(() => {
        const newValue = [...selectedValues, value]
        onClick(newValue)

        return newValue
      })
    }
  }

  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <FormControl sx={{ flexDirection: 'row' }} disabled={disabled}>
        {options.map((option) => (
          <div key={option.value}>
            <MuiCheckbox
              checked={option?.checked || selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              size='small'
            />
            {option.label}
          </div>
        ))}
        {helperText && (
          <FormHelperText sx={{ margin: '3px 0 3px 2px' }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}
