import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    fieldWidth: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '40%',
      },
    },
    tooltipStyle: {
      borderBottom: '1px ' + theme.palette.primary.main + ' solid',
      color: theme.palette.primary.main,
    },
  }
})
