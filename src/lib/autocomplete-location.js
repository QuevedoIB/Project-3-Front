import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';

export const mainMap = (callback) => {

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

  document.querySelector('#location .mapboxgl-ctrl-geocoder input').setAttribute('name', 'location');

  let input = document.querySelector('#location .mapboxgl-ctrl-geocoder input')

  input.addEventListener("change", callback);

  document.querySelector('#location .mapboxgl-ctrl-geocoder input').placeholder = 'Location';

  document.querySelector('.geocoder-icon-close').setAttribute('type', 'button');
  
};

export const getLocationValue = () => {
  const input = document.querySelector('#location .mapboxgl-ctrl-geocoder input');

  return input.value;
}
