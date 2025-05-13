import {
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { routePermissions } from 'routes/routePermissions'

const MenuList = () => {
  const theme = useTheme()

  const [selected, setSelected] = useState<number | null>(null)

  const handleSelected = (index: number) => setSelected(index)

  return (
    <Stack justifyContent='space-between'>
      {routePermissions.map((item, index) => {
        const isSelect = selected === index

        return (
          <List key={item.id} dense disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isSelect}
              onClick={() => handleSelected(index)}
              sx={{
                height: theme.spacing(6.5),
                marginRight: theme.spacing(3),
                color: isSelect ? '#00513E' : '#333',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  height: theme.spacing(6.5),
                  width: theme.spacing(0.5),
                  borderRadius: theme.spacing(0.5),
                  backgroundColor: theme.palette.primary.dark,
                  display: isSelect ? 'block' : 'none',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  fill: isSelect ? '#00513E' : '#7e84a3',
                  stroke: isSelect ? '#00513E' : '#7e84a3',
                }}
              >
                {item.icon}
              </ListItemIcon>

              <Typography variant='h4'>{item.title}</Typography>
            </ListItemButton>
          </List>
        )
      })}
    </Stack>
  )
}

export default MenuList
