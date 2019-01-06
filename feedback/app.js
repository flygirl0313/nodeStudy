const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('art-template');
const server = http.createServer();

var comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

server.on('request', function (req, res) {
  var parseObj = url.parse(req.url, true);
  var pathName = parseObj.pathname;
  if (pathName === '/') {
    fs.readFile('./views/index.html', function (err, data) {
      if (err) {
        return res.end('404 not found');
      }
      tempStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(tempStr);
    })
  } else if (pathName === '/post') {
    fs.readFile('./views/post.html', function (err, data) {
      if (err) {
        return res.end('404 not found');
      }
      res.end(data);
    })
  } else if (pathName.indexOf('/public/') === 0) {
    //开放前端静态资源
    fs.readFile('.' + pathName, function (err, data) {
      if (err) {
        return res.end('404 not found');
      }
      res.end(data);
    })
  } else if (pathName === '/pinglun') {
    var comment = parseObj.query;
    if (comment) {
      comment.dateTime = new Date().toLocaleDateString();
      comments.unshift(comment);
    }
    // 服务器存储数据，并重定向道首页
    res.statusCode = 302;
    res.setHeader('Location', '/')
    res.end()

  } else {
    // 统一处理404
    fs.readFile('./views/404.html', function (err, data) {
      if (err) {
        return res.end('404 not found');
      }
      res.end(data);
    })
  }
})

server.listen(3000)