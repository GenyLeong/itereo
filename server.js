var express = require('express');
var app  = require('express')();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public/'));



app.get('/data', function (req, res) {
  res.sendFile( __dirname + '/data.jason');
})

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/public/index.html');

});

http.listen(1450, function() {
  console.log('listening on *:1450');
});
