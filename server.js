var connect = require('connect');
var serveStatic = require('serve-static');
console.log("Running locally on port http://localhost:8080");
console.log("...");
connect().use(serveStatic(__dirname)).listen(8080);
