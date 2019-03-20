const path = require('path')
const express = require('express');
const template = require('art-template');
const fs = require('fs');
//创建服务器
const app = express();
//端口
const port = 3000;
const uri = `http://localhost:${port}`;

//服务器资源
// const filePath = '/root'
const filePath = '/Users/sizhimeng/desktop/学习/nodeStudy/express-demo'

//处理请求
app.get('/dir.html', function (req, res) {
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 not found')
    }
    fs.readdir(filePath, function (err, files) {
      if (err) {
        return res.end('Can not find root dir.')
      }
      let filesArr = handleFilesData(files);
      //渲染模版
      tempStr = template.render(data.toString(), {
        dirName: 'root',
        filesArr: filesArr,
      })
      res.send(tempStr)
    })
  })
})

// 处理文件相关信息
function handleFilesData(files) {
  var filesArr = []
  files.forEach((filename, fileindex) => {
    fs.statSync(filename, function (eror, stats) {
      if (eror) {
        console.log('获取文件stats失败');
        console.warn('获取文件stats失败');
      } else {
        var reg = new RegExp('-', 'g')
        var obj = {
          name: filename,
          size: stats.size,
          birthtime: stats.birthtime.toLocaleString().replace(reg, '/'), //创建时间
          mtime: stats.mtime.toLocaleString().replace(reg, '/'), // 最后一次修改时间
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory()
        }
      }
    })
    filesArr.push(obj)
  })
  console.log(filesArr)
  return filesArr
}


//监听端口 
app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('> Listening at ' + uri + '\n')
})