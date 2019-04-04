export function sortArrayByDistance(arrayUsers, userCoords) {

  let copyArray = arrayUsers.slice();
  const userLat = userCoords[0];
  const userLon = userCoords[1];

  const toRad = (number) => number * Math.PI / 180;

  copyArray.sort((a, b) => {

    const distanceToA = getDistanceBetween(a);
    const distanceToB = getDistanceBetween(b);

    return distanceToA - distanceToB;
  });

  function getDistanceBetween(user) {
    const lat2 = user.location.coords[0];
    const lon2 = user.location.coords[1];

    const R = 6371; // km 

    const x1 = lat2 - userLat;
    const dLat = toRad(x1);
    const x2 = lon2 - userLon;
    const dLon = toRad(x2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  return copyArray;
}

/*

    if (distanceToA > distanceToB) {
      answer = -1;
    } else if (distanceToA < distanceToB) {
      answer = 1;
    } else {
      answer = 0;
    }

    return answer;
*/