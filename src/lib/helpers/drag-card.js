export function startDragControl(callbackAdd, callbackNext) {

  const itemToDrag = document.querySelector('article.search-info-box');

  itemToDrag.style.height = '30vh';

  itemToDrag.addEventListener('touchstart', e => {

  })


  itemToDrag.addEventListener('touchmove', e => {


    let touchLocation = e.targetTouches[0];

    itemToDrag.style.left = touchLocation.pageX + itemToDrag.style.width / 2 + 'px';

  })

  itemToDrag.addEventListener('touchend', e => {

    if (parseInt(itemToDrag.style.left) > 357) {


      while (parseInt(itemToDrag.style.left) < 410) {
        itemToDrag.style.left = (parseInt(itemToDrag.style.left) + 1) + 'px';

      }

      itemToDrag.style.left = -340 + 'px';

      return callbackAdd(true);
    }

    if (parseInt(itemToDrag.style.left) < 58) {

      while (parseInt(itemToDrag.style.left) > -340) {


        itemToDrag.style.left = (parseInt(itemToDrag.style.left) - 1) + 'px';


      }

      itemToDrag.style.left = 410 + 'px';

      return callbackNext(true);
    }
  })

}

export function getBoxBack() {

  const itemToDrag = document.querySelector('article.search-info-box');
  let counterPlus = parseInt(itemToDrag.style.left);
  let counterMinus = parseInt(itemToDrag.style.left);


  if (parseInt(itemToDrag.style.left) > 357) {
    let intr = setInterval(function () {
      itemToDrag.style.left = counterMinus + 'px';
      counterMinus -= 5;
      if (parseInt(itemToDrag.style.left) < 40) {
        clearInterval(intr);
      }
    }, 1)
  }

  if (parseInt(itemToDrag.style.left) < 60) {
    let intr = setInterval(function () {
      itemToDrag.style.left = counterPlus + 'px';
      counterPlus += 5;
      if (parseInt(itemToDrag.style.left) > 39) {
        clearInterval(intr);
      }
    }, 1)
  }
}



/*
 if (parseInt(itemToDrag.style.left) > 357) {
      console.log('hola', parseInt(itemToDrag.style.left))
      let intr = setInterval(function () {
        itemToDrag.style.left = (parseInt(itemToDrag.style.left) + 1) + 'px';
        if (parseInt(itemToDrag.style.left) < 410) {
          clearInterval(intr);
          return callbackAdd;
        }
      }, 500)
    }

    if (parseInt(itemToDrag.style.left) < 58) {
      console.log('adios', parseInt(itemToDrag.style.left))
      let intr = setInterval(function () {
        itemToDrag.style.left = (parseInt(itemToDrag.style.left) - 1) + 'px';
        if (parseInt(itemToDrag.style.left) > -340) {
          console.log('finish')
          clearInterval(intr);
          return callbackNext;
        }
      }, 500)
    }
  })

*/