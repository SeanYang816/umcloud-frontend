import { Button, IconButton, Stack } from '@mui/material'

import { config } from 'config'
import UmediaLogoIcon from 'assets/icons/umedia_dark.svg?react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { Profile } from './components/Profile'

type HeaderProps = {
  isDesktop: boolean
  onClick: () => void
}

export const Header = ({ isDesktop, onClick }: HeaderProps) => {
  return (
    <Stack
      width='100%'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      {isDesktop ? (
        <Button component={Link} to={config.defaultPath} disableRipple>
          <UmediaLogoIcon />
        </Button>
      ) : (
        <IconButton onClick={onClick}>
          <MenuIcon
            sx={{
              marginLeft: '16px',
              fontSize: '36px',
              color: 'white',
            }}
          />
        </IconButton>
      )}

      <Profile />
    </Stack>
  )
}
