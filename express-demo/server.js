var express = require('express');
//创建服务器
var app = express();

// 公开的资源路径 （express.static自带的方法，开放资源）
app.use('/public/', express.static('./static/'))

//处理请求，判断路径不包含参数，只判断路径
app.get('/', function (req, res) {
  res.send('hello, express！')
})

//监听端口 
app.listen(3000, function () {
  console.log(`服务运行在:`)
})