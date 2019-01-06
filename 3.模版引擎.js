const template = require('art-template');
const fs = require('fs');
const http = require('http');

const server = http.createServer();
server.on('request', function (req, res) {
  var url = req.url;
  if (url = './art-template.html') {
    fs.readFile('./art-template.html', function (err, data) {
      if (err) {
        return res.end('404 not found')
      }
      temstr = data.toString();
      var result = template.render(temstr, {
        name: 'Jack',
        age: 18,
        province: '北京市',
        hobbies: [
          '写代码',
          '唱歌',
          '打游戏'
        ]
      })
      res.end(result)
    })

  }
})
server.listen(3000)