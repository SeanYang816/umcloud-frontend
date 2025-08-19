import { useCallback } from 'react'
import { Box } from '@mui/material'
import { Button } from './extends/Button'

type DeleteButtonType = {
  id: string
  onDelete: (_key: string) => void
}

export const DeleteButton = ({ id, onDelete }: DeleteButtonType) => {
  const deleteHandler = useCallback(() => {
    onDelete(id)
  }, [onDelete, id])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
      <Button
        icon='delete'
        text='delete'
        color='error'
        onClick={deleteHandler}
      />
    </Box>
  )
}
