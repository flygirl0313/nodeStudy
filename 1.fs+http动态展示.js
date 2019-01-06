const http = require('http');
const fs = require('fs');
const server = http.createServer();

const resource = '/Users/sizhimeng/Desktop/study/node/source'
server.on('request', function (req, res) {
  var url = req.url;
  var filePath = '/index.html'
  if (url !== '/') {
    filePath = url;
  }
  fs.readFile(resource + filePath, function (err, data) {
    if (err) {
      return res.end('404 not found')
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(data);
  })
})

server.listen(3000);