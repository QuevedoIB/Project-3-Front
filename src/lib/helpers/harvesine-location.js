export function sortArrayByDistance(arrayUsers, userCoords) {

  let copyArray = arrayUsers.slice();
  const userLat = userCoords[0];
  const userLon = userCoords[1];

  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }

  copyArray.sort((a, b) => {

    const distanceToA = getDistanceBetween(a);
    const distanceToB = getDistanceBetween(b);

    return distanceToA - distanceToB;
  });

  function getDistanceBetween(user) {
    const lat2 = user.location[0];
    const lon2 = user.location[1];

    const R = 6371; // km 

    const x1 = lat2 - userLat;
    const dLat = x1.toRad();
    const x2 = lon2 - userLon;
    const dLon = x2.toRad();
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat.toRad()) * Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  return copyArray;
}

