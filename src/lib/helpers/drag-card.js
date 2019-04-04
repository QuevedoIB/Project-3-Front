export function startDragControl(callbackAdd, callbackNext) {

  const itemToDrag = document.querySelector('article.search-info-box');

  itemToDrag.style.height = '40vh';
  itemToDrag.style.width = '80vw';


  itemToDrag.addEventListener('touchmove', e => {


    let touchLocation = e.targetTouches[0];


    itemToDrag.style.left = touchLocation.pageX - parseInt(itemToDrag.style.width) * 2 + 'px';
  })

  itemToDrag.addEventListener('touchend', e => {

    let counterPlus = parseInt(itemToDrag.style.left);
    let counterMinus = parseInt(itemToDrag.style.left);

    if (parseInt(itemToDrag.style.left) > 357) {


      // while (parseInt(itemToDrag.style.left) < 410) {
      //   itemToDrag.style.left = (parseInt(itemToDrag.style.left) + 1) + 'px';

      // }

      let intr = setInterval(function () {
        itemToDrag.style.left = counterMinus + 'px';
        counterMinus -= 5;
        if (parseInt(itemToDrag.style.left) < 410) {
          clearInterval(intr);
          itemToDrag.style.left = -340 + 'px';
          return callbackAdd(true);
        }
      }, 1)
    }

    if (parseInt(itemToDrag.style.left) < -100) {

      // while (parseInt(itemToDrag.style.left) > -340) {
      //   itemToDrag.style.left = (parseInt(itemToDrag.style.left) - 1) + 'px';
      // }


      let intr = setInterval(function () {
        itemToDrag.style.left = counterPlus + 'px';
        counterPlus += 5;
        if (parseInt(itemToDrag.style.left) > -340) {
          clearInterval(intr);
          itemToDrag.style.left = 410 + 'px';
          return callbackNext(true);
        }
      }, 1)
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

/*


    if (parseInt(itemToDrag.style.left) > 357) {


      while (parseInt(itemToDrag.style.left) - (parseInt(itemToDrag.style.width) / 2) < 410) {
        itemToDrag.style.left = (parseInt(itemToDrag.style.left) - (parseInt(itemToDrag.style.width) / 2) + 1) + 'px';

*/