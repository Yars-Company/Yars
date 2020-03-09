'use strict';

//Global Variables
var availableItems = [];
var cartItem = []; //Array to save all the added items of the cart
var soapsDiv = document.getElementById('soapSales');
var soapsNames = ['Soapy' , 'Saab', 'Baladi', 'Nabulsi', 'M3a6arah'];
var soapsDescription = ['Cocoa and Shea Butter', 'Argan and Cinnamon' , 'Lavender and Blue Clay', 'Pure Natural Beeswax Candles ','Coffee Bean'];
var soapPicture = ['soap1.jpg','soap2.jpg','soap3.jpg','soap4.jpg','soap5.jpg','soap6.jpg','soap7.jpg','soap8.jpg','soap9.jpg'];


// Function to create the first local storage item if it doesnt exist
if (localStorage.itemInCart === undefined ) {
  var firstItem = JSON.stringify(cartItem);
  localStorage.itemInCart = firstItem;
}

// Function to retrieve cart items from local storage
function retrieveLocalStorage(){
  var retrievedLocal = localStorage.itemInCart;
  cartItem = JSON.parse(retrievedLocal);
}
retrieveLocalStorage();


// Constructor function to create soap item list
function ListItems (name, description, url){
  this.name = name;
  this.description = description;
  this.url = `./img/${url}`;
  this.itemNumber = i;
  availableItems.push(this);
}

// For loop to create all the soaps that are inside soapNames and their descriptions and to create the listing in HTML store page using DOM manipulation
for (var i = 0; i<soapsNames.length;i++){
  new ListItems (soapsNames[i],soapsDescription[i], soapPicture[i]);

  // Now to create the item div itself and give it a unique ID

  var itemDiv = document.createElement('div');
  itemDiv.className = ('itemDiv');
  itemDiv.id = i;
  soapsDiv.appendChild(itemDiv);

  // Now to create each items information, first is the name

  var itemName = document.createElement('h5');
  itemDiv.appendChild(itemName);
  console.log(availableItems[i].name);
  itemName.textContent = availableItems[i].name;

  // Now creating the image element

  var itemPicture = document.createElement('img');
  itemDiv.appendChild(itemPicture);
  itemPicture.src = availableItems[i].url;

  // Now creating the description of the image

  var itemDescription = document.createElement('p');
  itemDiv.appendChild(itemDescription);
  itemDescription.textContent = availableItems[i].description;

  // Now creating a button to add to cart

  var buttonEl = document.createElement('button');
  itemDiv.appendChild(buttonEl);
  buttonEl.className = 'addToCartButton';
  buttonEl.textContent = 'Add to cart';
}
// Make an array to with all buttons to choose from them
var buttonElClass = document.getElementsByClassName('addToCartButton');

// Adding event listeners to the buttons
for (i = 0; i < availableItems.length ; i++){
  var addButton = buttonElClass[i];
  addButton.addEventListener('click', addToCart);
}

// Event listener function for the "add to cart" button to save what you clicked inside an array
function addToCart(event){
  var addItem = event.target;
  var itemID = addItem.parentElement.id;

  if (cartItem.includes(availableItems[itemID]) === true) {
    alert('ITEM ALREADY EXISTS IN CART!');
  } else {
    cartItem.push(availableItems[itemID]);
    cartLocalStorage();
  }
}


// Function to stringify the cart items and add it to local storage
function cartLocalStorage(){
  var jsonCart = JSON.stringify(cartItem);
  localStorage.itemInCart = jsonCart;
}
