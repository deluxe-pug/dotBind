'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../public'));

app.listen(port, function () {
  return console.log('Listening on port ' + port);
});