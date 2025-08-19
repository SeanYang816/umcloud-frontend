import { useCallback } from 'react'
import { Box } from '@mui/material'
import { Button } from './extends/Button'

type EditButtonType = {
  id: string
  onEdit: (_key: string) => void
}

export const EditButton = ({ id, onEdit }: EditButtonType) => {
  const editHandler = useCallback(() => {
    onEdit(id)
  }, [onEdit, id])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
      <Button icon='edit' text='edit' onClick={editHandler} />
    </Box>
  )
}
