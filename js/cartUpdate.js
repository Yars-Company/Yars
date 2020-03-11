'use strict';

var cartItem = []; //Array to save all the added items of the cart

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

function cartLength(){
  var length = document.getElementById('cartLength');
  length.textContent = '[' + cartItem.length + ']';
}
cartLength()