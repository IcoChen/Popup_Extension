console.log("draggable loaded");

function allowDrop(ev) {
  console.log(ev);
    ev.preventDefault();
}

function drag(ev) {
  console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    console.log(ev);
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//Make the DIV element draggagle:
dragElement(document.getElementById(("pet")));

function dragElement(elmnt) {
  console.log("the element is" + elmnt);
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('tabshow').addEventListener('dragstart', drag);

  // document.addEventListener('drop', drop);

  document.querySelectorAll('.group').forEach((group) => {
    console.log(group);
    group.addEventListener('dragover', allowDrop);
    group.addEventListener('drop', (ev) => {
      drop(ev);
    });
  });
});
