$(document).ready(function () {
  	
  	var btn = document.getElementById("yello");

	btn.onclick = function() {

		alert('heeellllo');
		var data = {
	    	'caption' : 'My Silent Ninja',
	    	'description': 'The Ninja is cute but dont mess with it',
	    	'photoUrl' : '/Users/c2444707/Desktop/untitled.png',
	    	'name' : 'Leena',
	    	'msProductId' : '1588878',
	    	'visible': false
	    };
		$.ajax({
	    type: "POST",
	    data: JSON.stringify(data),
        contentType: "application/json",
	    url: "http://localhost:3000/post-product" // modify the url according to your application logic
		}).done(function(photoStaticURL) {
	    // work with your data
	    console.log(photoStaticURL)
		});
	}
});



