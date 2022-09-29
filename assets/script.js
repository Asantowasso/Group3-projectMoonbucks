//Use an API for a store locater
// Use an API for music
//Create a system to take orders place in a modal
var euro
console.log(euro)
var britishPound


var drinks = ["Coffee", "Tea", ""]
var sizes = ["small", "medium", "large"]

var menuEl = document.querySelector("#menu")
var cartEl = document.querySelector('#cart')

// var requestURL = 'https://api.exchangerate.host/latest?symbols=USD,GBP';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   var response = request.response;
//   console.log(response);
//   var usDollar = response.rates.USD
//   console.log(usDollar)
//   var britishpound = response.rates.GBP
// }

fetch('https://api.exchangerate.host/latest?base=USD?symbols=GBP,EUR')
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    britishPound = data.rates.GBP
    console.log(britishPound) 
    euro = data.rates.EUR 
    console.log(euro)
})





var cart = {

}
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
  //iterates through the first 10 items in the array fetched from the API and creates and appends an element for each
    for (i = 0; i < 10; i++) {
      //defines the menu item element and its children
      var menuItem = document.createElement("div")
      var menuImg = document.createElement("img")
      var menuHeading = document.createElement("h4")
      var menuP = document.createElement("p")
      var menuBtn = document.createElement("button")

      //sets the attributes and text content of each element
      menuItem.setAttribute("class", "MenuItem")
      menuImg.setAttribute("src", data[i].image)
      menuHeading.textContent = data[i].title
      menuP.textContent = data[i].description
      menuBtn.setAttribute("class", "addBtn")
      menuBtn.setAttribute("data-title", data[i].title)
      menuBtn.textContent = "Add to Cart"

      //appends the menu item to the menu and appends the other elements to the menu item
      menuEl.appendChild(menuItem)
      menuItem.appendChild(menuImg)
      menuItem.appendChild(menuHeading)
      menuItem.appendChild(menuP)
      menuItem.appendChild(menuBtn)
        
    }
}

function addToCart(event) {
  var clickedBtn = event.target
  console.log(clickedBtn.getAttribute('class'))
  //if the element the user clicked is an "add to cart" button
  if (clickedBtn.getAttribute('class') == "addBtn") {
    console.log("clicked Btn")
    //gets the name of the item the user ordered which was stored in the button's "data-title" attribute
    var coffeName = clickedBtn.getAttribute('data-title')
    console.log(coffeName)
   
    //increments the value of the property of the cart object which has the name of the item the user chose or sets that property equal to 1 if it has not been chosen before
    if (cart[coffeName]) {
      cart[coffeName]++
    }
    else {
      cart[coffeName] = 1
    }
    console.log(cart)
  
    
    updateCart(coffeName)

  }
  
  //saves the cart object in local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  
}

function displayCart() {
  //iterates through the cart object and creates and appends a list item containing each property and value
  for (var coffee in cart) {
    var cartItem = document.createElement("li")
    cartItem.setAttribute('id', coffee)
    cartItem.setAttribute('class', 'cartItem')
    cartItem.textContent = coffee + " (" + cart[coffee] + ")" 
    console.log(cartItem)
    cartEl.appendChild(cartItem)
  }
}

// updates numbers display in the cart section of the page and checks if there is a list item for the item the user added to cart and creates one if there is not 
function updateCart(chosenItem) {
  var cartItems = document.querySelectorAll('.cartItem')
  var itemPresent
  //iterates through the list items currently on the page and sets each one's text content to display the newest number and checks if there is a list item for what the user chose
  for (i = 0; i < cartItems.length; i++) {
    var itemId = cartItems[i].getAttribute('id')
    
    cartItems[i].textContent = itemId + " (" + cart[itemId] + ")"
    if (chosenItem == itemId) {
      itemPresent = true
    }
  }
  //if there is no list item for the what the user just added to the cart, creates new one 
  if (!itemPresent) {
    var cartItem = document.createElement("li")
    cartItem.setAttribute('id', chosenItem)
    cartItem.setAttribute('class', 'cartItem')
    cartItem.textContent = chosenItem + " (" + cart[chosenItem] + ")" 
    console.log(cartItem)
    cartEl.appendChild(cartItem)
  }
}

getMenu()
displayCart()
menuEl.addEventListener('click', addToCart)
