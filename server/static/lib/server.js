const express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../public'));

app.listen(port, () => console.log('Listening on port ' + port));