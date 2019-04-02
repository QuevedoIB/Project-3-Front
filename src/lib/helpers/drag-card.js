export function startDragControl() {

  const itemToDrag = document.getElementById('search-contact-info');

  itemToDrag.addEventListener('touchmove', e => {
    let touchLocation = e.targetTouches[0];

    itemToDrag.style.left = touchLocation.pageX;
    itemToDrag.style.top = touchLocation.pageY;

  })

  itemToDrag.addEventListener('touchend', e => {

    //mirar x e y

    // hacer booleano si esta mas a la izq next si esta más a la derecha match
  })

}