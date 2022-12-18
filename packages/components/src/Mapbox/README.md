# Who to use ?

```tsx
const Test = () => {
  return (
    <Mapbox
      id="mapbox"
      token={process.env.REACT_APP_MAPBOX_TOKEN || ''}
      style={process.env.REACT_APP_MAPBOX_STYLE || ''}
      mapRef={ref => (map.current = ref)}
      options={{ center: [lng, lat] }}>
      <Source
        name={'scooters'}
        source={ALL_SOURCE}
        layers={[SCOOTER_LAYER]}
        data={[{ type: 'Point', properties: { color }, coordinates: [lng, lat] }]}
      />
    </Mapbox>
  )
}
const ALL_SOURCE: mapboxgl.AnySourceData = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [],
  },
}

const SCOOTER_LAYER: mapboxgl.CircleLayer = {
  id: 'scooter',
  type: 'circle',
  paint: {
    'circle-color': ['string', ['get', 'color'], ColorScooter.AVAILABLE],
    'circle-stroke-width': ['number', ['get', 'strokeWidth'], 0.25],
    'circle-stroke-color': ['string', ['get', 'strokeColor'], 'transparent'],
    'circle-radius': 9,
  },
  filter: ['==', '$type', 'Point'],
}
```
