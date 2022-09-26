//Use an API for a store locater
// Use an API for music
//Create a system to take orders place in a modal

var drinks = ["Coffee", "Tea", ""]
var sizes = ["small", "medium", "large"]

var modal= document.getElementById("cardModal");

var btn = document.getElementById("mdlBtn")

var span = decument.getElementsByClassName("close")[0];

btn.onclick = function () {
modal.style.display ="block"
}

span.onclic;k = function() {
modal.style.display="none"
}

window.onclick = function(event) {
if (event.target == modal){
    modal.style.display = "none";
}
}