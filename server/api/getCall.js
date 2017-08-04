const http = require('http');
const api = require('./apiHttpRequest.js');

const getImages = function() {
  const options = {
    host: 'http://realpeople.uksouth.cloudapp.azure.com:8080',
    path: '/service/real-people/v1.0/products/users',
    method: 'GET'
  };

  return new api.apiCall(options);
}

module.exports = {
    getImages: getImages
};