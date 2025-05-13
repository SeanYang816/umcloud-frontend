import { useCallback } from 'react'
import { Stack } from '@mui/material'
import { Button } from './extends/Button'

type EditDeleteButtonsType = {
  id: string
  onEdit: (key: string) => void
  onDelete: (key: string) => void
}

export const EditDeleteButtons = ({
  id,
  onEdit,
  onDelete,
}: EditDeleteButtonsType) => {
  const editHandler = useCallback(() => {
    onEdit(id)
  }, [onEdit, id])

  const deleteHandler = useCallback(() => {
    onDelete(id)
  }, [onDelete, id])

  return (
    <Stack direction='row' spacing={1.5}>
      <Button icon='edit' text='edit' onClick={editHandler} />
      <Button
        icon='delete'
        text='delete'
        color='error'
        onClick={deleteHandler}
      />
    </Stack>
  )
}
