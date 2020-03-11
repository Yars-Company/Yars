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
  var removeButton = document.getElementById(i);
  removeButton.addEventListener('click', removingButton);
}

function removingButton(event){
  var removeItem = event.target;
  var itemID = removeItem.parentElement.id;
  cartItem.splice(itemID , 1);
  updateCart();
  console.log('before updating total' + totalPrice);
  updateTotal();
  document.getElementById(itemID).remove();
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
    botHeaderEl.textContent = 'Your current price is: ' + totalPrice + ' JOD, ';
    var anchor = document.createElement('a');
    anchor.textContent = 'Checkout Page';
    anchor.href = './form.html';
    botHeaderEl.appendChild(anchor);
    console.log('cart got items');
  }
}
totalPriceFunction();

// Updating total price after remove

function updateTotal(){
  totalPrice = 0;
  for (var q=0; q<cartItem.length; q++){
    console.log(totalPrice);
    totalPrice = totalPrice + cartItem[q].price;
    console.log(totalPrice);
  }
  var updatedPrice = document.getElementById('totalTag');
  updatedPrice.textContent = 'Your current price is: ' + totalPrice + ' JOD, ';
  var anchor = document.createElement('a');
  anchor.textContent = 'Checkout Page';
  anchor.href = './form.html';
  updatedPrice.appendChild(anchor);
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
  var soapsToClear = document.getElementsByClassName('itemInformation');
  while(soapsToClear[0]) {
    soapsToClear[0].parentNode.removeChild(soapsToClear[0]);
  }
  localStorage.clear();
  totalPrice = 0;
  var updatedPrice = document.getElementById('totalTag');
  updatedPrice.textContent = 'Your current price is: ' + totalPrice + ' JOD, please go back to the ';
  var anchor = document.createElement('a');
  anchor.textContent = 'Store Page';
  anchor.href = './store.html';
  updatedPrice.appendChild(anchor);
  cartItem = [];
}

function cartLength(){
  var length = document.getElementById('cartLength');
  length.textContent = '[' + cartItem.length + ']';
}
cartLength();
