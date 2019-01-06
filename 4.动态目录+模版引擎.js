const http = require('http');
const fs = require('fs');
const template = require('art-template');
const server = http.createServer();

const resource = '/Users/sizhimeng/Desktop/study/node/source'
server.on('request', function (req, res) {
  var url = req.url;
  var filePath = '/index.html'
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 not found')
    }
    fs.readdir(resource, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }
      tempStr = template.render(data.toString(), {
        files: files
      })
      res.end(tempStr)
    })
  })
})

server.listen(3000);