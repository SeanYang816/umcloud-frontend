import { useTheme } from '@mui/material'
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import UmediaIcon from 'assets/icons/umedia_dark.svg?react'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { Button, PasswordField, TextField } from 'components/fields'
import { useAuth } from 'hooks/useAuth'

export const Login = () => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).required('Username is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values) => {
      await login(values.email, values.password)
    },
  })

  return (
    <Box
      component='form'
      onSubmit={formik.handleSubmit}
      sx={{
        height: '100vh',
        backgroundColor: '#D4E2E2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ minWidth: '475px' }}>
        <CardContent>
          <Stack
            alignItems='center'
            justifyContent='center'
            spacing={1}
            pt={2}
            pb={2}
          >
            <Box pb={7}>
              <UmediaIcon />
            </Box>
            <Typography
              color={theme.palette.secondary.main}
              variant={matchDownSM ? 'h3' : 'h2'}
              gutterBottom
            >
              Log In
            </Typography>
          </Stack>
          <>
            <TextField
              {...formik.getFieldProps('email')}
              placeholder='Email'
              errorMessage={formik.touched.email && formik.errors.email}
            />

            <PasswordField
              {...formik.getFieldProps('password')}
              placeholder='Password'
              errorMessage={formik.touched.password && formik.errors.password}
            />
            <Box mt={1}>
              <Button
                type='submit'
                fullWidth
                text='Log In'
                onClick={() => {}}
              />
            </Box>
            <Typography textAlign='center' mt={1}>
              Version: {import.meta.env.VITE_APP_VERSION}
            </Typography>
          </>
        </CardContent>
      </Card>
    </Box>
  )
}
