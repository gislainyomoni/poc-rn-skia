import { ScaleLinear } from 'd3-scale'

export const xDomainHeight = 15
export const gridSpace = 10

export const getTicks = (
  scale: ScaleLinear<number, number, never>,
  height: number,
  format?: (value: number) => string
) => {
  const tickSpacing = 100
  const numTicks = Math.ceil(height / tickSpacing)
  return scale.ticks(numTicks).map((value) => ({
    value,
    name: format ? format(value) : value.toString(),
  }))
}
