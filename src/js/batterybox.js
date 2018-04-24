dragElement(document.getElementById(("monster")));


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("gif", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("gif");
    ev.target.appendChild(document.getElementById(data));
}
