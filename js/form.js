
function alertMassege(){
  modal.style.display = 'block';
}


var modal = document.getElementById('myModal');

var buttonOk = document.getElementById('ok');

buttonOk.onclick = function() {
  modal.style.display = 'none';
};

