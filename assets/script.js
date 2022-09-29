//Use an API for a store locater
// Use an API for music
//Create a system to take orders place in a modal
// var euro
// console.log(euro)

// var britishpound
// console.log(britishpound)

var drinks = ["Coffee", "Tea", ""]
var sizes = ["small", "medium", "large"]

var menuEl = document.querySelector("#menu")
var cartEl = document.querySelector("#cart")
var totalEl = document.querySelector("#total")
var orderBtn =document.querySelector("#orderBtn")



var cart = {

}

//sets the object equal to one which has been previously saved in local storage if there is one
var savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart !== null) {
    cart = savedCart;
}
console.log(cart)

var orderTotal = 0
var orderQuantity = 0
for (coffee in cart) {
  orderQuantity += cart[coffee]
}
var dollarPrice = 4
var price

var currencyInput = "GBP"

function convertCurrency() {
  fetch('https://api.exchangerate.host/latest?base=USD?symbols=GBP,EUR')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
    var unroundedPrice = dollarPrice * data.rates[currencyInput]
    price = +unroundedPrice.toFixed(2)
    console.log(price)
    /*britishPound = data.rates.GBP
    console.log(britishPound) 
    euro = data.rates.EUR 
    console.log(euro)*/
    displayCart()
  })
}




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
      var menuPrice = document.createElement("p")
      var menuBtn = document.createElement("button")

      //sets the attributes and text content of each element
      menuItem.setAttribute("class", "MenuItem")
      menuImg.setAttribute("src", data[i].image)
      menuHeading.textContent = data[i].title
      menuP.textContent = data[i].description
      menuPrice.setAttribute = ("class", "price")
      menuPrice.textContent = price + " " + currencyInput
      menuBtn.setAttribute("class", "addBtn")
      menuBtn.setAttribute("data-title", data[i].title)
      menuBtn.textContent = "Add to Cart"

      //appends the menu item to the menu and appends the other elements to the menu item
      menuEl.appendChild(menuItem)
      menuItem.appendChild(menuImg)
      menuItem.appendChild(menuHeading)
      menuItem.appendChild(menuP)
      menuItem.appendChild(menuPrice)
      menuItem.appendChild(menuBtn)
        
    }
}
function addToCart(event) {
    var clickedBtn = event.target
    // console.log(clickedBtn.getAttribute('class'))
    if (clickedBtn.getAttribute('class') == "addBtn") {
    //   console.log("clicked Btn")
    // console.log(clickedBtn.getAttribute('data-title'))
    cart.push(clickedBtn.getAttribute('data-title'))
    //console.log(cart)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
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
    //console.log(cart)
    orderQuantity++
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
    //console.log(cartItem)
    cartEl.appendChild(cartItem)
  }
  console.log(price)
  totalEl.textContent = orderQuantity * price + " " + currencyInput
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
    //console.log(cartItem)
    cartEl.appendChild(cartItem)
  }
  totalEl.textContent = orderQuantity * price + " " + currencyInput
}

function placeOrder() {
  while (cartEl.hasChildNodes()) {
    cartEl.removeChild(cartEl.lastChild);
  }
}

convertCurrency()
getMenu()

menuEl.addEventListener('click', addToCart)
orderBtn.addEventListener('click', placeOrder)
