//Problem: we need a simple way to look at a users badge count and javascript point from a web browser
//solution: Use node.js to preform the profile look ups and server our template via HTTP

//1. Create a web server
var router = require('./router.js')
var http = require('http')


http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response)
	//response.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('server running at http 127.0.0.1:1337')


