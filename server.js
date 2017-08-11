
var express = require('express'),
//morgan = require('morgan'),
bodyParser = require('body-parser'),
multer = require('multer'),
crypto = require('crypto'),
methodOverride = require('method-override'),
mime = require('mime'),
app = express(),
port = process.env.PORT || 3000,
router = express.Router(),
fs = require('fs'),
http = require('http'),
exphbs = require('express-handlebars');
request = require('request');

var indexRoute = require('./server/routes/index/route');

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//app.use(morgan('dev'));

app.engine('hbs', exphbs({
    extname:'hbs',
    defaultLayout:'main.hbs'
}));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());                  // simulate DELETE and PUT

app.use('/', indexRoute);

app.listen(port);
console.log('App running on port', port);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
          cb(null, 'photo' + '.' + mime.extension(file.mimetype));
      });
    }
});

var upload = multer({
  storage: storage
});

router.post('/upload', upload.single("image"), function(req, res) {
    var data;
    // Get your data from your database
    var flickr = require('flickr-with-uploads');
    var api = flickr(
    process.env.consumer_key, // consumer_key
  	process.env.consumer_secret, // consumer_secret
  	process.env.oauth_token, // oauth_token
  	process.env.oauth_secret);

  	var fullpath = __dirname+'/public/uploads/'+req.file.filename;
	   var val;
	    var photoStaticURL;

	console.log('Request------------->>>>>'+req.body.caption, req.body.name, req.body.product, req.body.description);

	api({
		  method: 'upload',
		  title: req.body.caption,
		  description: req.body.description,
		  is_public: 0,
		  is_friend: 1,
		  is_family: 1,
		  hidden: 2,
		  photo: fs.createReadStream(fullpath)
	}, function(err, response) {
		  if (err) {
		    console.error('There was an error', err);
		    val="Error";
		  } else {
		 	console.error('Photo uploaded successfully'+response);
		 	console.log('Photo Id'+response.photoid);

	    	// usually, the method name is precisely the name of the API method, as they are here:
		    api({method: 'flickr.photos.getInfo', photo_id: response.photoid}, function(err, response) {
		      console.log('Full photo info:', response.photo[0]);
		      var photo = response.photo[0];
		      photoStaticURL = "https://farm" + photo.$.farm + ".staticflickr.com/" +  photo.$.server + "/" +
		                       photo.$.id + "_" + photo.$.secret + "_b.jpg";

		      console.log('Static URL---->'+photoStaticURL);
		      res.send('<p>Your profile submitted successfully</p>'+photoStaticURL);

          var requestBody = {
            "id": null,
            "name": req.body.name,
            "photoUrl": photoStaticURL,
            "caption": req.body.caption,
            "description": req.body.description,
            "msProductId": req.body.product,
            "visible": true
          };

           var options = {
             url: 'http://realpeople.uksouth.cloudapp.azure.com:8080/service/real-people/v1.0/products',
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             json: requestBody
           };

           request(options, function(err, res, body) {
             if (res && res.statusCode === 201) {
               console.log(res.statusCode);
             } else {
               console.log(err);
             }
           });
		    });
		  }
	});
});