import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

export const mainMap = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbm1hcHMiLCJhIjoiY2pzeDNkZHo0MGU2ZjQ1bzV3ZGExNXRmMCJ9.Yc4_1JYlXjBEZ-mXzuETgA';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-79.4512, 43.6568],
    zoom: 13
  });

  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });

  const div = document.getElementById('location');

  div.appendChild(geocoder.onAdd(map));

  const input = document.querySelector('#location .mapboxgl-ctrl-geocoder input').setAttribute('name', 'location');

  document.querySelector('#location .mapboxgl-ctrl-geocoder input');

  document.querySelector('#location .mapboxgl-ctrl-geocoder input').placeholder = 'Location';

};

export const getLocationValue = () => {
  const input = document.querySelector('#location .mapboxgl-ctrl-geocoder input')
  return input.value;
}
