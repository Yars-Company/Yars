'use strict';

// Global variables
var cartItem = []; //Array to save all the added items of the cart
var cartID = document.getElementById('yarsCart');
var bottomHeader = document.getElementById('bottomHeader');
var totalPrice = 0;

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

// For loop to create each item inside the HTML file

for (var i = 0; i < cartItem.length; i++){
  var divEl = document.createElement('div');
  cartID.appendChild(divEl);
  divEl.className = 'itemInformation';
  divEl.id = i;

  // Now creating the image element

  var itemPicture = document.createElement('img');
  divEl.appendChild(itemPicture);
  itemPicture.src = cartItem[i].url;
  itemPicture.width = 150;
  itemPicture.height = 150;


  // Add item info

  var soapNameEl = document.createElement('span');
  divEl.appendChild(soapNameEl);
  soapNameEl.textContent = cartItem[i].name;
  soapNameEl.className = 'nameOfSoap';

  // Add item price

  var priceEl = document.createElement('span');
  divEl.appendChild(priceEl);
  priceEl.textContent = cartItem[i].price + ' JOD';
  priceEl.className = 'priceOfSoap';

  // Add remove button

  var buttonEl = document.createElement('button');
  divEl.appendChild(buttonEl);
  buttonEl.textContent = 'Remove';
  buttonEl.className = 'removeButton';
}

// Make an array to with all buttons to choose from them
var buttonElClass = document.getElementsByClassName('removeButton');

// Adding event listeners to the buttons
for (i = 0; i < cartItem.length ; i++){
  var removeButton = buttonElClass[i];
  removeButton.addEventListener('click', removingButton);
}

function removingButton(event){
  var removeItem = event.target;
  var itemID = removeItem.parentElement.id;
  updateTotal(itemID);
  document.getElementById(itemID).remove();
  cartItem.splice(itemID , 1);
  updateCart();
  console.log(itemID);
}

// Total price

function totalPriceFunction(){
  for (i = 0; i < cartItem.length; i++) {
    totalPrice = totalPrice + cartItem[i].price;
  }
  if (cartItem.length === 0) {
    console.log('empty cart');
  } else {
    document.getElementById('emptyCartWarning').remove();
    var botHeaderEl = document.createElement('p');
    bottomHeader.appendChild(botHeaderEl);
    botHeaderEl.id = 'totalTag';
    bottomHeader.appendChild = totalPrice;
    botHeaderEl.textContent = 'Your current price is: ' + totalPrice + ' JOD';
    console.log('cart got items');
  }
}
totalPriceFunction();

// Updating total price after remove

function updateTotal(itemID){
  totalPrice = totalPrice - cartItem[itemID].price;
  var updatedPrice = document.getElementById('totalTag');
  updatedPrice.textContent = 'Your current price is: ' + totalPrice + ' JOD';
}

// Function to update local storage after removing an item

function updateCart(){
  localStorage.clear();
  var jsonCart = JSON.stringify(cartItem);
  localStorage.itemInCart = jsonCart;
}

// Add event listener to Clear all button

var clearAll = document.getElementById('clearAll');
clearAll.addEventListener('click', clearAllFunction);

function clearAllFunction(){
  var elementsToClear = document.getElementsByClassName('itemInformation');
  while(elementsToClear[0]) {
    elementsToClear[0].parentNode.removeChild(elementsToClear[0]);
  }
  localStorage.clear();
  cartItem = [];
}

