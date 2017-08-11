var imageApi = require('../../api/getCall.js')
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  imageApi.getImages().then(function(data){
      console.log(data);
      res.render('index', {  'title': 'Real People' });
    }, function(error){
      console.log('sebbss');
    });
});

module.exports = app;
