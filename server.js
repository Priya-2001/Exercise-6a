var module = require('./dbmodule');
var url = require('url');
var querystring1 = require('querystring');
var http = require('http');


http.createServer(function(request, response) {
var data1 = '';
if (request.url === '/favicon.ico') {
response.writeHead(200, { 'Content-Type': 'image/x-icon' });
response.end();
} 
else
 {
request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function() {
var name = querystring1.parse(data1)["uname"];
console.log(name);
var pass = querystring1.parse(data1)["pwd"];
console.log(pass);
var fname = querystring1.parse(data1)["fname"];
var lname = querystring1.parse(data1)["lname"];
var mail = querystring1.parse(data1)['email'];
if (request.url === '/signup') {
module.authenticateUser(name, pass, fname, lname, mail, response);
            } else if (request.url === '/save') {
module.saveUser(name, pass, response);
response.write("User saved");
            } else {
console.log("invalid url");
            }
        });
    }
}).listen(3000);
console.log("Server started");