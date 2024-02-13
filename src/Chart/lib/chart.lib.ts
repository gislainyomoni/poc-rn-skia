import { ScaleLinear } from 'd3-scale'

export type Tuple = [number, number]

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

export const niceDomain = (domain: Tuple, count: number) => {
  'worklet'
  const [start, stop] = domain
  const step = Math.pow(10, Math.floor(Math.log(stop - start) / Math.LN10) - 2)
  const niceStart = Math.floor(start / step) * step
  const niceStop = Math.ceil(stop / step) * step
  return [niceStart, niceStop]
}
export const scaleLinear = (n: number, domain: Tuple, range: Tuple) => {
  'worklet'
  const [d1, d2] = domain
  const [r1, r2] = range
  return r1 + (r2 - r1) * ((n - d1) / (d2 - d1))
}

export const invertScaleLinear = (n: number, domain: Tuple, range: Tuple) => {
  'worklet'
  const [d1, d2] = domain
  const [r1, r2] = range
  return d1 + (d2 - d1) * ((n - r1) / (r2 - r1))
}
