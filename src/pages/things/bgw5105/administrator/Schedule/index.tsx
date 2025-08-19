import { useCallback, useEffect, useState } from 'react'
import { PageHeader } from 'components/PageHeader'
import {
  Box,
  Card,
  CardActions,
  Checkbox as MuiCheckbox,
  Stack,
} from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useSelector } from 'react-redux'
import { BGW_EVENT_ACTIONS } from 'constant'
import { RootStateProps, FormikValuesType, StringStringType } from 'types'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import {
  Checkbox,
  CustomHHmmSelect,
  Radios,
  TextField,
} from 'components/fields'
import { useFormik } from 'formik'
import { checkboxProps, radiosProps, textfieldProps } from 'utils/formik'
import { isUpperCase } from 'utils'
import { EditModal } from './EditModal'
import { formValidationSchema } from './validationSchema'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { EditDeleteButtons } from 'components/EditDeleteButtons'
import { MRT_ColumnDef } from 'material-react-table'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

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

type PayloadType_add = {
  'schedule-add': string
  '_schedule.name': string
  '_schedule.days': string
  '_schedule.start.time': string
  '_schedule.stop.time': string // DOC: document is wrong, 'end' should be 'stop'
}

type PayloadType_delete = {
  [key: string]: string
}

export const Schedule = () => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.administrator.schedule,
  )
  const result = data?.result ?? {}

  const [list] = useApiResultObjectToArrayByCommonId(result, 'time-setting')

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const [isFetch, setIsFetch] = useState(false)
  const [editKey, setEditKey] = useState('')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      isDaily: '0',
      days: 'SMTWTFS',
      isAllDay: true,
      start_time: '0000',
      end_time: '2400',
    },
    enableReinitialize: true,
    validationSchema: formValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.isDaily === '1') {
        values.days = daily
      }
      if (values.isAllDay) {
        formik.setFieldValue('start_time', '0000')
        formik.setFieldValue('end_time', '2400')
      }
      const rootId = '_schedule.'
      const payload: PayloadType_add = {
        'schedule-add': 'Add',
        [`${rootId}name`]: values.name,
        [`${rootId}days`]: values.days,
        [`${rootId}start.time`]: values.start_time,
        [`${rootId}stop.time`]: values.end_time, // DOC: document is wrong, 'end' should be 'stop'
      } as PayloadType_add

      sendWsSetMessage(BGW_EVENT_ACTIONS.SCHEDULE_ADD_SCHEDULE_RULE, payload)
      resetForm()
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

  const handleDialogOpen = (key: string) => {
    setEditKey(key)
    sendWsGetMessage(BGW_EVENT_ACTIONS.SCHEDULE_GET_SCHEDULE_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
  }

  const handleDelete = useCallback(
    (key: string) => {
      const payload: PayloadType_delete = {
        [`cbi.rts.schedule.${key}`]: 'Delete',
      }
      sendWsSetMessage(BGW_EVENT_ACTIONS.SCHEDULE_DELETE_SCHEDULE_RULE, payload)
    },
    [sendWsSetMessage],
  )

  const handleApply = useCallback(() => {
    sendWsSetMessage(BGW_EVENT_ACTIONS.SCHEDULE_SET_SCHEDULE_PAGE, {})
  }, [sendWsSetMessage])

  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Name',
      accessorFn: (row) => row.name,
      size: 150,
    },
    {
      header: 'Days',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.days }} />
      ),
      size: 150,
    },
    {
      header: 'Start Time',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.start_time }} />
      ),
      size: 150,
    },
    {
      header: 'End Time',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.end_time }} />
      ),
      size: 150,
    },
    {
      accessorKey: '編輯',
      header: '',
      size: 150,
      Cell: ({ row }) => (
        <DialogController>
          {({ open, onOpen, onClose }) => (
            <>
              <EditDeleteButtons
                id={row.original.key}
                onEdit={() => {
                  onOpen()
                  handleDialogOpen(row.original.key)
                }}
                onDelete={handleDelete}
              />
              <EditModal
                id={editKey}
                open={open}
                onClose={() => {
                  onClose()
                  handleDialogClose()
                }}
              />
            </>
          )}
        </DialogController>
      ),
    },
  ]

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

  useEffect(() => {
    setIsFetch(true)
    sendWsGetMessage(BGW_EVENT_ACTIONS.SCHEDULE_GET_SCHEDULE_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Schedule'
        subtitle='The schedule configuration is used to manage schedule rules'
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <StyledMuiReactTable
          title='Schedule Rules'
          rows={list}
          columns={columns}
        />

        <Card>
          <CardHeader title='Add New Schedule Rule' />
          <StyledCardContent>
            <TextField {...textfieldProps('name', 'Name', formik)} />

            <Radios {...radiosProps('isDaily', 'Days:', isDailyList, formik)} />
            <Box mt={-1} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
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
                        onChange={(e) =>
                          handleDayClick(e.target.checked, index)
                        }
                      />
                    </Box>
                    {label}
                  </Stack>
                )
              })}
            </Box>

            <Checkbox
              {...checkboxProps('isAllDay', 'All Day - 24 Hrs', formik)}
            />
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
          </StyledCardContent>
          <CardActions>
            <Button
              icon='add'
              text='add'
              onClick={() => formik.handleSubmit()}
            />
          </CardActions>
        </Card>
      </Box>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={handleApply} />
      </Stack>
    </>
  )
}
