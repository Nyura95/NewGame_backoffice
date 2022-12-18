import React, { useEffect, useLayoutEffect } from 'react'

import { AnySourceData, Map, MapMouseEvent, EventData, GeoJSONSource, AnyLayer } from 'mapbox-gl'

type Position = number[]

export interface IData {
  coordinates: Position | Position[][]
  properties: object
  type: 'Polygon' | 'Point'
}

interface IProps {
  data?: IData[]
  layers: AnyLayer[]
  map?: Map
  name: string
  onClick?: {
    action: (e: MapMouseEvent & EventData) => void
    layer: string
  }[]
  source: AnySourceData
}

export const Source: React.FC<IProps> = ({ data, layers, map, name, source, onClick }) => {
  useLayoutEffect(() => {
    if (map && !map.getSource(name)) {
      map.addSource(name, source)

      for (const layer of layers) {
        if (!map.getLayer(layer.id)) {
          map.addLayer({ ...layer, source: name } as AnyLayer)
        }
      }

      if (onClick) {
        for (const key of onClick) {
          map.on('click', key.layer, key.action)
        }
      }
    }
  }, [map, name, source, onClick, layers])

  useEffect(() => {
    if (map && data) {
      const source = map.getSource(name) as GeoJSONSource | undefined
      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: data.map(
            x =>
              ({
                type: 'Feature',
                properties: x.properties,
                geometry: {
                  type: x.type,
                  coordinates: x.coordinates,
                },
              } as GeoJSON.Feature),
          ),
        })
      }
    }
  }, [map, name, data])

  return null
}
