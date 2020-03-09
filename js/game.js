// global
var images = ['soap1', 'soap2', 'soap3', 'soap1', 'soap2', 'soap3'];
var arrImageObject = [];
var whenClick = document.getElementById('container');
whenClick.addEventListener('click', flip);
var backImage = new BulidImage('back');
var matching;
var firstClickImage;
var score = 0;
// constrctur
shuffle(images);
function BulidImage(nameImage) {
  this.nameImage = nameImage;
  this.urlImage = `img/${nameImage}.jpg`;
}
intialBulidImage();
function intialBulidImage() {
  for (var i = 0; i < images.length; i++) {
    arrImageObject.push(new BulidImage(images[i]));
  }
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


intialDom();
setTimeout(hideAllImage, 2000);
function hideAllImage() {
  var show = document.getElementsByClassName('show');
  var hide = document.getElementsByClassName('hide');
  for (var i = 0; i < show.length; i++) {
    show[i].setAttribute('class', 'hide');
    hide[i].setAttribute('class', 'show');
  }
}

function intialDom() {
  for (var i = 0; i < images.length; i++) {
    var divElm = createElem(whenClick, 'div');
    var backImg = createElem(divElm, 'img');
    setAt(backImg, backImage, 'hide','back.'+i);
    var frontImg = createElem(divElm, 'img');
    setAt(frontImg, arrImageObject[i] , 'show',i);
  }
}

function setAt(elementImage, imageObject , className, idName) {
  elementImage.setAttribute('src', imageObject.urlImage);
  elementImage.setAttribute('alt', imageObject.nameImage);
  elementImage.setAttribute('class', className);
  elementImage.setAttribute('id', idName);

}

function createElem(parent, elementName) {
  var element = document.createElement(elementName);
  parent.appendChild(element);
  return element;
}

function flip(event) {
  var theTarget = event.target.id;
  if (theTarget.includes('back')){
    var back= document.getElementById(theTarget);
    var front = document.getElementById(theTarget.split('.')[1]);
    back.setAttribute('class','hide');
    front.setAttribute('class','show');
    compare(front,back);
  }
}

function compare(front,back) {
  if (matching && matching === front.alt) {
    whenClick.removeEventListener('click',flip);
    setTimeout(()=>correctAnswer(front),2000);
  }
  else if (matching && matching !== front.alt) {
    whenClick.removeEventListener('click',flip);
    setTimeout(()=>falseAnswer(front, back),2000);
  }
  else {
    matching = front.alt;
    firstClickImage = front.id;
  }
}

function correctAnswer(front) {
  var oldFront = document.getElementById(firstClickImage);
  oldFront.setAttribute('class', 'hideVisibility');
  front.setAttribute('class', 'hideVisibility');
  whenClick.addEventListener('click',flip);
  matching = '';
  score++;
}

function falseAnswer( front, back) {
  var oldFront = document.getElementById(firstClickImage);
  var oldBack = document.getElementById('back.' + firstClickImage);
  oldFront.setAttribute('class', 'hide');
  oldBack.setAttribute('class', 'show');
  front.setAttribute('class', 'hide');
  back.setAttribute('class', 'show');
  whenClick.addEventListener('click',flip);
  matching = '';
}

