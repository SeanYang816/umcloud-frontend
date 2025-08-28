import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Button } from 'components/extends/Button'
import { TextField } from 'components/formik'
import { useFormik } from 'formik'
import {
  Thing,
  useGetThingLazyQuery,
  useUpdateThingAliasMutation,
} from 'generated/graphql'
import { useMutationHandler } from 'hooks/useMutationHandler'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDevice } from 'reducers/device'
import { RootStateProps } from 'types'
import { formikField } from 'utils/formik'

type DialogProps = {
  open: boolean
  onClose: () => void
}

export const UpdateThingAliasDialog: FC<DialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStateProps) => state.device)
  const [getThing] = useGetThingLazyQuery({ fetchPolicy: 'cache-and-network' })
  const [updateAliasMutation] = useUpdateThingAliasMutation()
  const updateAlias = useMutationHandler(updateAliasMutation, 'Change alias')
  const formik = useFormik({
    initialValues: {
      alias: data?.alias,
    },
    async onSubmit(values) {
      await updateAlias({
        variables: {
          mac: data?.mac ?? '',
          serialNumber: data?.serialNumber ?? '',
          alias: values.alias ?? '',
        },
      })
      const response = await getThing({
        variables: {
          id: data?.id ?? '',
        },
      })
      dispatch(updateDevice(response.data?.thing as Thing))
      console.log(response)
    },
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle typography='h2'>Edit Alias</DialogTitle>
        <TextField label='Alias' {...formikField(formik, 'alias')} />
      </DialogContent>
      <DialogActions>
        <Button
          icon='apply'
          text='Confirm'
          color='info'
          onClick={() => {
            formik.submitForm()
            onClose()
          }}
        />
        <Button icon='cancel' text='back' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
