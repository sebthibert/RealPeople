var imageApi = require('../../api/getCall.js')
const express = require('express');

const app = express();

app.get('/', function (req, res) {

  imageApi.getImages().then(function(data){
      console.log(data);
    }, function(error){
      console.log('sebbss');
    });

  res.render('index', {
    data: 'data'
  });
});

module.exports = app;
