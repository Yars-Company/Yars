'use strict';

//Global Variables
var availableItems = [];
var soapsDiv = document.getElementById('soapSales');
var soapsNames = ['Soapy' , 'Saab', 'Baladi', 'Nabulsi', 'M3a6arah'];
var soapsDescription = ['Very Soapy Soap', 'A Saab Soap' , 'The old traditional soap', 'Nabulsi soap 3\'anye 3an el ta3reef ','soap with nice smell'];
var soapPicture = ['soap1.jpg','soap2.jpg','soap3.jpg','soap4.jpg','soap5.jpg'];


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

  var itemName = document.createElement('h3');
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
}

