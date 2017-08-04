const http = require('http');

module.exports = {
  apiCall: function(options){
    return new Promise((resolve, reject) => {

      const httpReq = http.request(options, (httpRes) => {
        // Buffer the body entirely for processing as a whole.
        const bodyChunks = [];
        //console.log(httpRes);
        httpRes.on('data', (chunk) => {
          // You can process streamed parts here...
          bodyChunks.push(chunk);

        }).on('end', function() {
          const body = Buffer.concat(bodyChunks);
          var parsedBody = JSON.parse(body);
          //TODO add some stuff here to make it more robust
          resolve(parsedBody);
        });
      });

      httpReq.on('socket', function(socket){
        socket.on('timeout', function(){
          reject(err);
          httpReq.abort();
        });
      });

      httpReq.on('error', (err) => {
        reject(err);
      });

      httpReq.end();
    });
  }
};