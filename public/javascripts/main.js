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

var postFile = function(event) {
  var data = {
    'caption' : 'My Silent Ninja',
    'description': 'The Ninja is cute but dont mess with it',
    'photoUrl' : url,
    'name' : 'Leena',
    'msProductId' : '1588878',
    'visible': false
  };
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "http://localhost:8080/post-product" // modify the url according to your application logic
  }).done(function(photoStaticURL) {
    // work with your data
    console.log(photoStaticURL)
  });
}

$(document).keypress(function(e) {
  if(e.which == 13) {
    window.location.href = "man.html";
  }
});