import React, { useEffect } from 'react'

import { AnyLayer, Map } from 'mapbox-gl'

interface IProps {
  layer: AnyLayer
  map?: Map
  source?: string
}

export const Layer: React.FC<IProps> = ({ map, source, layer }) => {
  useEffect(() => {
    if (map && !map.getLayer(layer.id)) {
      map.addLayer(layer)
    }
  }, [map, source, layer])

  return null
}
