import { ReactNode } from 'react'

import { IChartProvider } from '../../lib/chart.context'

export interface IChartContainerContentProps {
  children?: ReactNode
}

export interface IChartContainerProps
  extends Omit<IChartProvider, 'children'>,
    IChartContainerContentProps {}
