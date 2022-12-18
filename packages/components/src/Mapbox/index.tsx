import React, { useRef, useEffect, useCallback } from 'react'

import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css'
import { Spinner, TypeColor } from '../Template'
import { NAME_SOURCE, ALL_SOURCE, SCOOTER_LAYER, ZONE_LAYER } from './const'
import { IData } from './interface'

interface IProps {
  accessToken: string
  center?: mapboxgl.LngLatLike
  children?: React.ReactNode
  height?: number
  isError?: boolean
  isFetching?: boolean
  layers?: IData<'Polygon'>[]
  onLoad?: () => void
  onRefresh?: () => void
  scooters?: IData<'Point'>[]
  style: string
  zoom?: number
}

export const Mapbox: React.FC<IProps> = ({
  accessToken,
  center = [0, 0],
  height = 500,
  style,
  zoom = 12,
  isFetching = false,
  isError = false,
  layers = [],
  scooters = [],
  onLoad,
  onRefresh,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map>()

  const setData = useCallback(() => {
    if (map.current) {
      const source = map.current.getSource(NAME_SOURCE) as mapboxgl.GeoJSONSource | undefined
      if (source) {
        source.setData({
          type: 'FeatureCollection',
          features: [
            ...scooters.map(
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
            ...layers.map(
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
          ],
        })
      }
    }
  }, [layers, scooters])

  useEffect(() => {
    if (map.current) return
    mapboxgl.accessToken = accessToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style,
      center,
      zoom,
    })

    map.current.on('load', () => {
      if (onLoad) onLoad()
      if (map.current) {
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
        map.current.addSource(NAME_SOURCE, ALL_SOURCE)
        map.current.addLayer(SCOOTER_LAYER)
        map.current.addLayer(ZONE_LAYER)
      }
    })
  })

  useEffect(() => {
    setData()
  }, [scooters, layers, setData])

  return (
    <div style={{ height }} ref={mapContainer} className="map-container">
      <div className="mapboxgl-ctrl-top-right" style={{ top: 92 }}>
        <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
          <button
            className="mapboxgl-ctrl-zoom-in"
            type="button"
            aria-label="Zoom in"
            aria-disabled="false"
            onClick={onRefresh}>
            <Spinner
              type={'grow'}
              color={
                isFetching ? TypeColor.danger : isError ? TypeColor.warning : TypeColor.success
              }
              style={{ width: '100%', height: '100%' }}
              stopAnimation={!isFetching && !isError}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
