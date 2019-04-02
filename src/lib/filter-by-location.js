import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import fetch from 'node-fetch';

//añadir key al .env?¿ falla el access token porque se pierde al pasar a js

export const getSortedByDistanceArray = (usersArray, userLocation) => {

  let copyArray = usersArray.slice();

  let userCoordinates;

  const token = `pk.eyJ1IjoiaXZhbm1hcHMiLCJhIjoiY2p0dXFoenR2MDBkYTQ1cDhtcXNsbXZmdyJ9.xUz2uqz5N5ydjWTl-p4qCQ`;

  mapboxgl.accessToken = token;
  MapboxGeocoder.accessToken = token;

  //añadir helper auto coger coordenadas al registrarse si no hay nada

  mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbm1hcHMiLCJhIjoiY2pzeDNkZHo0MGU2ZjQ1bzV3ZGExNXRmMCJ9.Yc4_1JYlXjBEZ-mXzuETgA';

  const mapDiv = document.getElementById('map');

  const map = new mapboxgl.Map({
    container: mapDiv,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-79.4512, 43.6568],
    zoom: 15
  });

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }));

  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));

  fetch(`https://api.mapbox.com/geocoding/v5/places/${userLocation}.json&access_token=${token}`)
    .then(function (response) {

      return response.json();
    })
    .then(function (myJson) {
      if (myJson.features[0]) {
        userCoordinates = myJson.features[0].center;

      }

      if (!userCoordinates) {
        return;
      }
    });

  function sortArrayByDistanceBetween() {
    return copyArray.sort((a, b) => {
      let aCoordinates = getCoordsFromPlace(a.location);

      let bCoordinates = getCoordsFromPlace(b.location);

      return getDistanceBetween(userCoordinates, aCoordinates) - getDistanceBetween(userCoordinates, bCoordinates);
    })
  }

  //mirar console.log(directions) para usar metros en vez de kms y ser más precisos

  function getDistanceBetween(coordsA, coordsB) {
    let distanceInKms;
    fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${coordsA[0]},${coordsA[1]};${coordsB[0]},${coordsB[1]}?steps=true&voice_instructions=true&banner_instructions=true&voice_units=imperial&waypoint_names=Home;Work&access_token=${token}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let directions = myJson;
        if (directions) {
          const kms = directions.routes[0].distance / 1000;
          distanceInKms = Math.round((kms) * 100) / 100;
        }
      });
    return distanceInKms;
  }

  sortArrayByDistanceBetween()

  return copyArray;
}

// export function getCoordsFromPlace(place) {
//   let coordinates;
//   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiaXZhbm1hcHMiLCJhIjoiY2p0dXFoenR2MDBkYTQ1cDhtcXNsbXZmdyJ9.xUz2uqz5N5ydjWTl-p4qCQ`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (myJson) {
//       if (myJson.features[0]) {
//         coordinates = myJson.features[0].center;
//       }
//     });
//   return coordinates;
// }


export async function getCoordsFromPlace(place) {
  let coordinates;
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiaXZhbm1hcHMiLCJhIjoiY2p0dXFoenR2MDBkYTQ1cDhtcXNsbXZmdyJ9.xUz2uqz5N5ydjWTl-p4qCQ`)
  const jsonResponse = await response.json()
  if (jsonResponse.features[0]) {
    coordinates = jsonResponse.features[0].center;
  }
  console.log(place, coordinates)
  return coordinates;
}
