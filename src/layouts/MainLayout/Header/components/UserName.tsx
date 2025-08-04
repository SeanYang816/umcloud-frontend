import { Stack, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'

export const UserName = () => {
  const displayName = (useSelector(
    (state: RootStateProps) => state.bgw5105.authentication.user,
  ) || '') as string
  const name = displayName?.slice(0, 2).toUpperCase()
  const theme = useTheme()

  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      mr={1}
      sx={{
        width: '37.5px',
        height: '37.5px',
        borderRadius: '100%',
        fontSize: theme.typography.h5.fontSize,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {name}
    </Stack>
  )
}
