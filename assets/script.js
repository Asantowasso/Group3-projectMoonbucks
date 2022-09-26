//Use an API for a store locater
// Use an API for music
//Create a system to take orders place in a modal

var drinks = ["Coffee", "Tea", ""]
var sizes = ["small", "medium", "large"]

var menuEl = document.querySelector("#menu")
var addBtns = document.querySelector(".addBtn")
var cart = []
//sets the object equal to one which has been previously saved in local storage if there is one
var savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart !== null) {
    cart = savedCart;
}
console.log(cart)

function getMenu() {
fetch('https://api.sampleapis.com/coffee/hot')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayMenu(data)
  });
}

function displayMenu(data) {
    for (i = 0; i < 10; i++) {
        var menuItem = document.createElement("div")
        var menuImg = document.createElement("img")
        var menuHeading = document.createElement("h4")
        var menuP = document.createElement("p")
        var menuBtn = document.createElement("button")
        menuItem.setAttribute("class", "MenuItem")
        menuImg.setAttribute("src", data[i].image)
        menuHeading.textContent = data[i].title
        menuP.textContent = data[i].description
        menuBtn.setAttribute("class", "addBtn")
        menuBtn.textContent = "Add to Cart"
        menuEl.appendChild(menuItem)
        menuItem.appendChild(menuImg)
        menuItem.appendChild(menuHeading)
        menuItem.appendChild(menuP)
        menuItem.appendChild(menuBtn)
    }
}


getMenu();