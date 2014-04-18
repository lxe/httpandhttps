var app   = require('express')()
  , http  = require('http')
  , https = require('https')
  , fs    = require('fs');

// Ports!
var ports = {
  https : 443,
  http  : 80
};

// Routes!
app.get('/', function (req, res) {
  res.send('Hello World');
});

// Config!
var httpServer  = http.createServer(app);
var httpsServer = https.createServer({
  key  : fs.readFileSync('server.key', 'utf8'),
  cert : fs.readFileSync('server.crt', 'utf8')
}, app);

// Go Go Go!
httpServer.listen(ports.http, function (err) {
  if (err) return console.error(err.stack);
  console.log('Runnning http  server on :%d', ports.http);
  httpsServer.listen(443, function (err) {
    if (err) return console.error(err.stack);
    console.log('Runnning https server on :%d', ports.https);
  });
});
