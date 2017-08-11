const http = require('http');

module.exports = {
  apiCall: function(options){
    return new Promise((resolve, reject) => {
      http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);

        res.on("data", function(chunk) {
          console.log("BODY: " + chunk);
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
      });
    });
  }
};