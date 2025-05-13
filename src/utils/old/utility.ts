import { GridCellParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import duration from 'dayjs/plugin/duration'
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(duration)

export const PasteToClipboard = (param: GridCellParams) => {
  // TODO: local 端 param.value 不會有 undefined ，打包上傳後會產生 undefined
  // 目前將在 <PaginatedDataGrid.tsx> 內的 <DataGrid> 關掉屬性 onCellClick={PasteToClipboard}
  if (param.value) {
    navigator.clipboard.writeText(param?.value?.toString())
  }
}

// TODO: 230423 轉換容量
export const bytesToSize = (bytes) => {
  if (0 === bytes) return '0 B'
  const basicUnit = 1024
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const mathBytes = Math.floor(Math.log(bytes) / Math.log(basicUnit))

  return (
    parseFloat((bytes / Math.pow(basicUnit, mathBytes)).toFixed(2)) +
    ' ' +
    unit[mathBytes]
  )
}

// TODO: 230424 累積上傳時間
export const durationConvert = (time) => {
  const accumulationTime = dayjs.duration(time, 'seconds')
  let timePicker
  if (
    accumulationTime.days() === 0 &&
    accumulationTime.hours() === 0 &&
    accumulationTime.minutes() === 0
  ) {
    timePicker = accumulationTime.format('s[S]')
  } else if (accumulationTime.days() === 0 && accumulationTime.hours() === 0) {
    timePicker = accumulationTime.format('m[M],s[S]')
  } else if (accumulationTime.days() === 0) {
    timePicker = accumulationTime.format('H[H],m[M],s[S]')
  } else {
    timePicker = accumulationTime.format('D[D],H[H],m[M],s[S]')
  }

  return timePicker
}

export const bpsToSize = (bps) => {
  if (0 === bps) return '0 bps'
  const basicUnit = 1000
  const unit = ['Kbps', 'Mbps', 'Gbps']
  const mathBps = Math.floor(Math.log(bps) / Math.log(basicUnit))

  return (
    parseFloat((bps / Math.pow(basicUnit, mathBps)).toFixed(2)) +
    ' ' +
    unit[mathBps]
  )
}
