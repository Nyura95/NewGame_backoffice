type Position = number[]

export interface IData<T = 'Polygon' | 'Point'> {
  coordinates: Position | Position[][]
  properties: object
  type: T
}
