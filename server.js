var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  fileName = __dirname + '/dist' + (req.url === '/' ? '/index.html' : req.url);
  fs.stat(fileName, function(err, path) {
    if (err) {
      console.log(err);
      var file = fs.createReadStream(__dirname + '/dist/404.html');
    } else {
      var file = fs.createReadStream(fileName);
    }
    file.pipe(res);
  });
});

server.listen(3000);
