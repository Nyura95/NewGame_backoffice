export const NAME_SOURCE = 'all'

export const ALL_SOURCE: mapboxgl.AnySourceData = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [],
  },
}

export const SCOOTER_LAYER: mapboxgl.CircleLayer = {
  id: 'scooter',
  source: NAME_SOURCE,
  type: 'circle',
  paint: {
    'circle-color': ['string', ['get', 'color'], 'red'],
    'circle-stroke-width': ['number', ['get', 'strokeWidth'], 0.25],
    'circle-stroke-color': ['string', ['get', 'strokeColor'], 'transparent'],
    'circle-radius': 9,
  },
  filter: ['==', '$type', 'Point'],
}

export const ZONE_LAYER: mapboxgl.FillLayer = {
  id: 'zone',
  source: NAME_SOURCE,
  type: 'fill',
  paint: {
    'fill-color': ['string', ['get', 'color'], '#5e93ff'],
    'fill-opacity': 0.15,
  },
  filter: ['==', '$type', 'Polygon'],
}
