var databaseUrl = "localhost/mydb1";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
db.collection("student");
console.log("Connected");

exports.authenticateUser = function(uname, pwd, fname, lname, mail, response) {
console.log(uname);
console.log(pwd);
db.student.find({ "Username": uname, "Password": pwd },
function(err, users) {
if (err || !users) {
response.write("..Not authorized user" || err);
response.end();
            } else if (users.length == 0) {
response.write("Not authorized user");
response.end();
            } else {
                response.write('<body bgcolor="#0E035F" style="color:white">');
        response.write('<center>');
        response.write("<h3>You are an authorized user</h3>")
        response.write('<h3>Welcome '+fname+ ' '+lname+'</h3>');
        response.write('<h3>Your email id '+mail+' has been registered successfully.</h3>');
        response.write('<h3>Your username is: '+uname+'</h3>');
        response.write('<h3>Your password is: '+pwd+'</h3>');
        response.write('<h3>Thank you for registering!Please login before exploring our website</h3>')
        response.write('</center>');
        response.write('</body');

response.end();
            }

        });
}

exports.saveUser = function(uname, pwd, response) {
console.log('Saving user to mongo');
db.student.insert({ "Username": uname, "Password": pwd },

function(err, saved) {
if (err || !saved)
console.log(err);
else
console.log("User saved");
        });
}