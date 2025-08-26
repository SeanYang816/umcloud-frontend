import React from 'react'
import { Card, CardActions } from '@mui/material'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { optionsConverter } from 'utils/optionsConverter'
import { XPB_EVENT_ACTIONS } from 'constant'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select, TextField } from 'components/formik'

import type { Options, StringStringType } from 'types'
import type { AddPortTriggerRuleRequest } from 'types/xpb510/network/firewall'
import { formValidationSchema } from './validationSchema'

/** ---------- Props ---------- */
type FormTypes = {
  options: Options
  list: StringStringType[]
}

/** ---------- Derive form values from your API type (_newfwd.* -> field name) ---------- */
type FormValues = {
  [K in keyof AddPortTriggerRuleRequest as K extends `_newfwd.${infer P}`
    ? P
    : never]: AddPortTriggerRuleRequest[K]
}

/** ---------- Prefix helper: { k: v } -> { `_newfwd.${k}`: v } ---------- */
type Prefixed<T> = {
  [K in Extract<keyof T, string> as `_newfwd.${K}`]: T[K]
}

function mapNewfwd<const T extends Record<string, unknown>>(v: T): Prefixed<T> {
  const pairs = Object.entries(v).map(([k, val]) => [
    `_newfwd.${k}` as `_newfwd.${Extract<typeof k, string>}`,
    val,
  ])

  // fromEntries returns Record<PropertyKey, unknown>, so we assert to the precise mapped type
  return Object.fromEntries(pairs) as Prefixed<T>
}

export const AddPortTriggerForm: React.FC<FormTypes> = ({ options, list }) => {
  const { sendWsSetMessage } = useSendWsMessage()

  // Options (server-provided)
  const ifaceList = optionsConverter(options, '_newfwd.iface')
  const matchProtoList = optionsConverter(options, '_newfwd.match_proto')
  const triggerProtoList = optionsConverter(options, '_newfwd.trigger_proto')
  const scheduleList = optionsConverter(options, '_newfwd.schedule')

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      iface: '',
      match_proto: '',
      match_port: '',
      trigger_proto: '',
      trigger_port: '',
      schedule: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // carry over enabled states of existing rules
      const enabledItems = list.reduce<Record<string, boolean>>(
        (acc, { key, enabled }) => {
          acc[`cbi.sts.firewall.${key}.enabled`] = !!enabled

          return acc
        },
        {},
      )

      const payload: AddPortTriggerRuleRequest = {
        'cbi.submit': '1',
        'cbi.sts.firewall.trigger': '1',
        'cbi.cts.firewall.trigger.': 'Add',
        ...mapNewfwd(values),
        ...enabledItems,
      }

      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_PORT_TRIGGER_RULE,
        payload,
      )
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New Port Trigger Rule' />
      <StyledCardContent>
        <TextField label='Name' {...formikField<FormValues>(formik, 'name')} />

        <Select
          label='Interface'
          options={ifaceList}
          {...formikField<FormValues>(formik, 'iface')}
        />

        <Select
          label='Match protocol'
          options={matchProtoList}
          {...formikField<FormValues>(formik, 'match_proto')}
        />

        <TextField
          label='Match port'
          {...formikField<FormValues>(formik, 'match_port')}
        />

        <Select
          label='Trigger protocol'
          options={triggerProtoList}
          {...formikField<FormValues>(formik, 'trigger_proto')}
        />

        <TextField
          label='Trigger port'
          {...formikField<FormValues>(formik, 'trigger_port')}
        />

        <Select
          label='Schedule'
          options={scheduleList}
          {...formikField<FormValues>(formik, 'schedule')}
        />
      </StyledCardContent>

      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.submitForm()} />
      </CardActions>
    </Card>
  )
}
