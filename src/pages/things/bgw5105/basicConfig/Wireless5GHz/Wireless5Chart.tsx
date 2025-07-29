import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { AssocMac, Lease } from '../BasicInformation/type'
import { ExtendedType } from '.'

echarts.use([GridComponent, PieChart])

type WirelessChartProps = {
  list: Array<Lease & AssocMac & ExtendedType>
}

export const Wireless5Chart = ({ list }: WirelessChartProps) => {
  const count = list.length

  const data = list.map((item) => ({
    name: item.hostname || item.mac,
    value: count,
  }))

  const chartData = {
    title: {
      text: 'Clients',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: 'Device Name: {b}',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: true,
        data: data,
      },
    ],
  }

  return (
    <ReactEChartsCore echarts={echarts} option={chartData} lazyUpdate={true} />
  )
}
