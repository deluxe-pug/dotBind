const express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../../../client/app/dist'));

app.listen(port, () => console.log('Listening on port ' + port));
