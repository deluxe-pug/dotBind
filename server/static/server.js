const express = require('express');
let app = express();
let port = process.env.port || 8000;

app.use(express.static(__dirname + '/../public'));


app.listen(port, function() {
  console.log('Listening on port 8000');
});
