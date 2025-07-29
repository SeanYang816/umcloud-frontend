import React, { useCallback } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Checkbox as MuiCheckbox,
  Stack,
  DialogActions,
  Dialog,
  DialogContent,
} from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { isUpperCase } from 'utils'
import { SERVER_ACTIONS } from 'constant'
import {
  CustomHHmmSelect,
  Radios,
  TextField,
  Checkbox,
} from 'components/fields'
import { checkboxProps, radiosProps, textfieldProps } from 'utils/formik'
import { modalValidationSchema } from './validationSchema'
import { DefaultRootStateProps, FormikValuesType } from 'types'
import { useSelector } from 'react-redux'
import { Button } from 'components/extends/Button'

type EditModalProps = {
  id: string
  open: boolean
  onClose: (key: string) => void
}

type PayloadType = {
  'schedule-modify': string
  '_schedule.name': string
  '_schedule.days': string
  '_schedule.start.time': string
  '_schedule.stop.time': string
}

const daily = 'SMTWTFS'

const daysList = [
  { label: 'Sunday', value: 'S' },
  { label: 'Monday', value: 'M' },
  { label: 'Tuesday', value: 'T' },
  { label: 'Wednesday', value: 'W' },
  { label: 'Thursday', value: 'T' },
  { label: 'Friday', value: 'F' },
  { label: 'Saturday', value: 'S' },
]

export const EditModal: React.FC<EditModalProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: DefaultRootStateProps) => state.administrator.scheduleEdit,
  )
  const result = data?.result ?? {}

  const rootId = `cbid.schedule.${id}.`

  const { sendWsSetMessage } = useSendWsMessage()

  const isDailyList = [
    {
      label: 'Daily',
      value: '1',
    },
    {
      label: 'Select Day(s)',
      value: '0',
    },
  ]

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: result[`${rootId}name`] ?? '',
      isDaily: result[`${rootId}days`] === daily ? '1' : '0',
      days: result[`${rootId}days`] ?? daily,
      isAllDay:
        result[`${rootId}start_time`] === '0000' &&
        result[`${rootId}end_time`] === '2400',
      start_time: result[`${rootId}start_time`] ?? '0000',
      end_time: result[`${rootId}end_time`] ?? '2400',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (values) => {
      if (values.isDaily === '1') {
        values.days = daily
      }
      if (values.isAllDay) {
        formik.setFieldValue('start_time', '0000')
        formik.setFieldValue('end_time', '2400')
      }
      const rootId = '_schedule'
      const payload: PayloadType = {
        'schedule-modify': 'Modify',
        [`${rootId}.name`]: values.name,
        [`${rootId}.days`]: values.days,
        [`${rootId}.start.time`]: values.start_time,
        [`${rootId}.stop.time`]: values.end_time,
      } as PayloadType

      sendWsSetMessage(
        SERVER_ACTIONS.SCHEDULE_SET_SCHEDULE_EDIT_PAGE,
        payload,
        id,
      )
      onClose(id)
    },
  })

  const handleDayClick = useCallback(
    (checked: boolean, index: number) => {
      const currentDays = formik.values.days as string

      const newChar = checked
        ? currentDays[index].toUpperCase()
        : currentDays[index].toLowerCase()
      const newValue =
        currentDays.substring(0, index) +
        newChar +
        currentDays.substring(index + 1)

      formik.setFieldValue('days', newValue)
    },
    [formik],
  )

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <TextField {...textfieldProps('name', 'Name', formik)} />
        <Radios {...radiosProps('isDaily', 'Days:', isDailyList, formik)} />
        <Box
          mt={-1}
          mb={2}
          sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
        >
          {daysList.map(({ label }, index) => {
            const currentDays = formik.values.days as string
            const checked = isUpperCase(currentDays[index]) || false

            return (
              <Stack key={index} mr={2} alignItems='center' direction='row'>
                <Box>
                  <MuiCheckbox
                    disabled={formik.values.isDaily === '1'}
                    checked={checked}
                    size='small'
                    onChange={(e) => handleDayClick(e.target.checked, index)}
                  />
                </Box>
                {label}
              </Stack>
            )
          })}
        </Box>
        <Checkbox {...checkboxProps('isAllDay', 'All Day - 24 Hrs', formik)} />
        <CustomHHmmSelect
          disabled={formik.values.isAllDay === true}
          name='start_time'
          label='Start Time'
          value={`${formik.values.start_time}`}
          onChange={formik.setFieldValue}
        />
        <CustomHHmmSelect
          isEnd
          disabled={formik.values.isAllDay === true}
          name='end_time'
          label='End Time'
          value={`${formik.values.end_time}`}
          onChange={formik.setFieldValue}
        />
      </DialogContent>
      <DialogActions>
        <Button
          icon='confirm'
          text='confirm'
          onClick={() => formik.handleSubmit()}
        />
        <Button
          icon='cancel'
          text='cancel'
          color='error'
          onClick={() => onClose(id)}
        />
      </DialogActions>
    </Dialog>
  )
}
