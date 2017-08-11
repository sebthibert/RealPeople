new CBPGridGallery( document.getElementById( 'grid-gallery' ) );

$(document).ready(function() {
  $(".slideshow-heart").click(function() {
    $(this).toggleClass("active");
  });
});

var modal = document.getElementById('myModal');
var btn = document.getElementById("modal-button");
var span = document.getElementsByClassName("close")[0];
var url = "";

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var previewFile = function(event) {

  var output = document.getElementById('preview');

  output.src = URL.createObjectURL(event.target.files[0]);

  console.log(event.target.files[0]);
  url = output.src;
  console.log(output.src);
};