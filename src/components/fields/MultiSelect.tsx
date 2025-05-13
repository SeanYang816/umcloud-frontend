import React, { useState } from 'react'
import {
  FormControl,
  InputLabel,
  TextField,
  Autocomplete,
  Chip,
  Box,
} from '@mui/material'
import { FormikHelpers } from 'formik'
import { CUSTOM_OPTION } from 'constant'
import { FormikValuesType, SelectOptionProps } from 'types'
import { ErrorMessage } from 'components/ErrorMessage'
import { HelperText } from 'components/extends/HelperText'

type SelectProps = {
  name: string
  label?: string
  value: string[]
  options: SelectOptionProps[]
  variant?: 'filled' | 'standard' | 'outlined'
  fullWidth?: boolean
  helperText?: string
  placeholder?: string
  setFieldValue: FormikHelpers<FormikValuesType>['setFieldValue'] // Specify setFieldValue type
  freeSolo?: boolean // Indicator for allowing custom input
  errorMessage?: string | boolean | undefined
}

export const MultiSelect: React.FC<SelectProps> = ({
  freeSolo = false, // Use freeSolo as the indicator for custom input
  label,
  options = [],
  variant = 'filled',
  value,
  fullWidth = true,
  placeholder = '',
  setFieldValue,
  errorMessage,
  name,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: string[] | string,
  ) => {
    // Check if newValue is an array (multiple selections) or a string (single custom input)
    const updatedValue = Array.isArray(newValue) ? newValue : [newValue]
    if (setFieldValue) {
      // 這裡還得想想如果沒用Formik 怎辦 (need fix)
      setFieldValue(name, updatedValue)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      freeSolo && // Allow custom input only when freeSolo is true
      (event.key === 'Tab' || event.key === 'Enter') &&
      inputValue.trim() !== ''
    ) {
      // Save the custom input value and clear the input field
      setFieldValue(name, [...value, inputValue])
      setInputValue('')
      event.preventDefault() // Prevent default behavior (e.g., tab navigation)
    }
  }

  const filteredOption = options.filter((item) => item.value !== CUSTOM_OPTION)

  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <FormControl
        variant={variant}
        fullWidth={fullWidth}
        sx={{ margin: '0 0 16px' }}
      >
        <Autocomplete
          multiple
          freeSolo={freeSolo}
          options={filteredOption.map((option) => option.label)}
          value={value || []}
          onChange={handleChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant='filled'
                size='small'
                label={option}
                {...getTagProps({ index })}
                key={option} // or `${option}-${index}` if duplicates possible
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              sx={{ margin: '0', padding: '8px 0 0' }}
              placeholder={placeholder}
              onKeyDown={handleKeyDown} // Attach the keydown handler
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          )}
        />
        <HelperText>
          {
            'Please press Enter to apply each string. This input field supports entering multiple strings.'
          }
        </HelperText>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </FormControl>
    </Box>
  )
}
