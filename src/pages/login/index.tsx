import { Button, useTheme } from '@mui/material'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import Background from 'assets/background.png'
import Logo from 'assets/icons/umedia-logo.svg'

import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useAuth } from 'hooks/useAuth'
import { StyledTextField } from 'components/fields/StyledTextField'
import { StyledPasswordField } from 'components/fields/StyledPasswordField'
import { getFormikProps } from 'utils/formik'

export const Login = () => {
  const theme = useTheme()
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={Background}
        alt='Banner'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        gap={3}
      >
        <img src={Logo} alt='Logo' width={350} style={{ marginTop: 16 }} />

        <Stack>
          <Card
            sx={{
              maxWidth: 480,
              borderRadius: 4,
              background: 'linear-gradient(to bottom, #01334D, #008FC2)',
              px: 8,
            }}
          >
            <CardContent>
              <Stack mb={6}>
                <Typography
                  color={theme.palette.common.white}
                  fontSize={52}
                  fontWeight={900}
                  mb={-2}
                  noWrap
                >
                  IoT Cloud
                </Typography>

                <Typography
                  color={theme.palette.common.white}
                  fontSize={32}
                  fontWeight={900}
                  noWrap
                >
                  Management System
                </Typography>
              </Stack>
              <>
                <StyledTextField
                  white
                  label='Email'
                  {...getFormikProps('email', formik)}
                  sx={{
                    mb: 2,
                  }}
                />
                <StyledPasswordField
                  white
                  label='Password'
                  {...getFormikProps('password', formik)}
                  sx={{
                    mb: 2,
                  }}
                />

                <Typography
                  textAlign='right'
                  mb={2}
                  color={theme.palette.grey[100]}
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Forgot password?
                </Typography>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    height: 52,
                    backgroundColor: '#27D4EF',
                    mb: 2,
                  }}
                >
                  Sign In
                </Button>
                <Typography textAlign='center' color='#75E3FF'>
                  Version: {window.__CONFIG__.VITE_APP_VERSION}
                </Typography>
              </>
            </CardContent>
          </Card>
          <Typography
            textAlign={'center'}
            mt={1}
            variant='caption'
            color='#75E3FF'
          >
            Copyright © U-MEDIA Communications Inc. All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
