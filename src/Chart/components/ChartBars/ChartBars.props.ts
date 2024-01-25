export interface IChartBarsProps {
  data: {
    name: string
    value: number
  }[]
  formatLabel?: (value: number) => string
}
