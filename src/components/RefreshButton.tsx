import { IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

interface RefreshButtonProps {
  onClick: () => void
}

export const RefreshButton = ({ onClick }: RefreshButtonProps) => {
  return (
    <IconButton aria-label='refresh' onClick={onClick}>
      <RefreshIcon
        titleAccess='Refresh'
        htmlColor='#18a3b2'
        fontSize='medium'
      />
    </IconButton>
  )
}
