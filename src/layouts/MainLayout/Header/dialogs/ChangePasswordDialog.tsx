import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material'
import { useChangePasswordMutation } from 'generated/graphql'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutationHandler } from 'hooks/useMutationHandler'
import { PasswordField } from 'components/fields'

type ChangePasswordDialogProps = {
  open: boolean
  onClose: () => void
}

export const ChangePasswordDialog = ({
  open,
  onClose,
}: ChangePasswordDialogProps) => {
  const theme = useTheme()
  const [changePasswordMutation] = useChangePasswordMutation()
  const changePassword = useMutationHandler(
    changePasswordMutation,
    'Change password',
  )

  const formik = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
      newPass2: '',
    },
    validationSchema: Yup.object().shape({
      oldPass: Yup.string().required('required'),
      newPass: Yup.string().min(5).required('required'),
      newPass2: Yup.string()
        .required()
        .oneOf([Yup.ref('newPass')], 'must match new password'),
    }),
    onSubmit: async (values) => {
      await changePassword({
        variables: {
          newPass: values.newPass,
          oldPass: values.oldPass,
        },
      })
      await handleClose()
    },
  })

  const handleClose = () => {
    onClose()
    formik.resetForm()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant='h2' color={theme.palette.error.main}>
        Change Password
      </DialogTitle>

      <DialogContent>
        <PasswordField
          label='Enter original password'
          {...formik.getFieldProps('oldPass')}
          errorMessage={formik.touched.oldPass && formik.errors.oldPass}
        />
        <PasswordField
          label='Enter a new password'
          {...formik.getFieldProps('newPass')}
          errorMessage={formik.touched.newPass && formik.errors.newPass}
        />
        <PasswordField
          label='Enter the new password again'
          {...formik.getFieldProps('newPass2')}
          errorMessage={formik.touched.newPass2 && formik.errors.newPass2}
        />
      </DialogContent>

      <DialogActions>
        <Button color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='error' onClick={() => formik.handleSubmit()}>
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  )
}
