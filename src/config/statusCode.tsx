import { toast as reactToast } from 'react-toastify'

export const toastHandler = (status: string) => {
  switch (status) {
    case '0':
      reactToast.success('success')
      break
    default:
      reactToast.error('error')
      break
  }
}
