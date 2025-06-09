import { SelectChangeEvent } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import { FormikValuesType, SelectOptionProps } from 'types'

export const checkboxProps = (
  fieldName: string,
  label: string,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  // Convert the value to a boolean
  const checked =
    formik.values[fieldName] === true || formik.values[fieldName] === '1'

  // Handle toggling between checked and unchecked
  const onChange = () => {
    const currentValue = formik.values[fieldName]
    const newValue =
      typeof currentValue === 'boolean'
        ? !currentValue
        : currentValue === '1'
          ? '0'
          : '1'
    formik.setFieldValue(fieldName, newValue)
  }

  return {
    ...getFieldProps(fieldName),
    label,
    checked,
    onChange,
  }
}

export const radiosProps = (
  fieldName: string,
  label: string,
  options: Array<SelectOptionProps>,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    options,
  }
}

export const toggleButtonProps = (
  fieldName: string,
  label: string,
  text: string | [string, string],
  onClick: () => void,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    onClick,
    text,
  }
}

export const textfieldProps = (
  fieldName: string,
  label: React.ReactNode,
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const multiTextfieldProps = (
  fieldName: string,
  label: string,
  formik: FormikProps<FormikValuesType>,
) => {
  const { setFieldValue, getFieldProps, errors, touched } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    name: fieldName,
    setFieldValue,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const multiSelectProps = (
  fieldName: string,
  label: string,
  options: Array<SelectOptionProps> = [],
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors, setFieldValue } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    name: fieldName,
    options,
    setFieldValue,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const selectProps = (
  fieldName: string,
  label: React.ReactNode,
  options: Array<SelectOptionProps> = [],
  formik: FormikProps<FormikValuesType>,
) => {
  const { getFieldProps, touched, errors } = formik

  return {
    ...getFieldProps(fieldName),
    label,
    options,
    errorMessage: touched[fieldName] && errors[fieldName],
  }
}

export const handleSelectInputChange = (
  e: SelectChangeEvent<unknown>,
  formik: FormikProps<FormikValuesType>,
): void => {
  const { name, value } = e.target
  formik.setFieldValue(name as string, value as string)
}

export const handleToggle = (
  name: string,
  value: boolean,
  formik: FormikProps<FormikValuesType>,
) => {
  formik.setFieldValue(name, value)
}

// ------
export const getFormikProps = <T>(name: keyof T, formik: FormikProps<T>) => {
  const fieldName = name as string

  return {
    ...formik.getFieldProps(fieldName),
    error: Boolean(formik.touched[name] && formik.errors[name]),
    helperText:
      formik.touched[name] && formik.errors[name]
        ? (formik.errors[name] as string)
        : undefined,
  }
}
