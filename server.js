var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/client")));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8000, function() {
  console.log('Clarity on Port 8000');
});
