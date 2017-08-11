const http = require('http');
const api = require('./apiHttpRequest.js');

const getImages = function() {
  var options = {
    host: 'realpeople.uksouth.cloudapp.azure.com',
    port: 8080,
    path: '/service/real-people/v1.0/products/users'
  };

  return new api.apiCall(options);
}

module.exports = {
    getImages: getImages
};