import { format } from 'date-fns'

export const dateValueFormatterSecondsTable = (params: string) => {
  return format(new Date(params), 'yyyy-MM-dd HH:mm:ss')
}
