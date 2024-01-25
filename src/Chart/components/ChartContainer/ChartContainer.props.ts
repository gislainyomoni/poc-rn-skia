import { ReactElement } from 'react'

import { IChartProvider } from '../../lib/chart.context'

export interface IChartContainerContentProps {
  children?: ReactElement
}

export interface IChartContainerProps
  extends Omit<IChartProvider, 'children'>,
    IChartContainerContentProps {}
