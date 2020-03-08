'use strict';

//Global Variables
var availableItems = [];
var cartItem = []; //Array to save all the added items of the cart
var soapsDiv = document.getElementById('soapSales');
var soapsNames = ['Soapy' , 'Saab', 'Baladi', 'Nabulsi', 'M3a6arah'];
var soapsDescription = ['Very Soapy Soap', 'A Saab Soap' , 'The old traditional soap', 'Nabulsi soap 3\'anye 3an el ta3reef ','soap with nice smell'];
var soapPicture = ['s1.jpg','s2.jpg','s3.jpg','soap4.jpg','soap5.jpg'];
var soapPrice = [7,8,4,6,10];


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
function ListItems (name, description, url,price){
  this.name = name;
  this.description = description;
  this.url = `./img/${url}`;
  this.itemNumber = i;
  this.price = price;
  availableItems.push(this);
}

// For loop to create all the soaps that are inside soapNames and their descriptions and to create the listing in HTML store page using DOM manipulation
for (var i = 0; i<soapsNames.length;i++){
  new ListItems (soapsNames[i],soapsDescription[i], soapPicture[i],soapPrice[i]);

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

  // Now creating the price tab

  var priceEl = document.createElement('span');
  itemDiv.appendChild(priceEl);
  priceEl.textContent = availableItems[i].price + ' JOD';
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
    alert('This item already exists inside your cart!');
  } else {
    cartItem.push(availableItems[itemID]);
    alert(`Item ${availableItems[itemID].name} has been added to your cart!`);
    cartLocalStorage();
  }
}


// Function to stringify the cart items and add it to local storage
function cartLocalStorage(){
  var jsonCart = JSON.stringify(cartItem);
  localStorage.itemInCart = jsonCart;
}
