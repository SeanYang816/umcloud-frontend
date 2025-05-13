import { styled } from '@mui/material/styles'
import { CardContent } from '@mui/material'

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
  },
}))
