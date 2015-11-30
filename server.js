var express = require('express');
var app = express();
var PORT = process.env.PORT  || 3000;

app.get('/',function(req,res) {
	res.send('Hello Shivangi');
});

app.listen(PORT, function() {
	console.log('Express JS is running on port: ' + PORT);
});