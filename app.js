var express = require("express");
var app = express();
app.use(express.static(__dirname));

app.listen('9900',function(){
	console.log("listen at 9900");
});