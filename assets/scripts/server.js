/*
 * @Author: Mr.Mark  
 * @Date: 2019-08-22 09:46:20 
 * @Last Modified by: Mr.Mark 
 * @Last Modified time: 2019-08-22 10:21:50
 */
// 自定义项目结构
const http = require('http');
const fs = require('fs');

// 项目目录
let mkDir = [
  {
    name: 'scripts',
    child: [
      {
        name: 'util.js',
        val: `console.log('this is a common file!');`
      },
      {
        name: 'apis.js',
        val: `console.log('this is a api file!');`
      },
      {
        name: 'main.js',
        val: `console.log('this is a main file!');`
      }
    ]
  },
  {
    name: 'styles',
    child: [
      {
        name: 'public.css',
        val: `body {
          margin: 0;
        }`
      },
      {
        name: 'reset.css',
        val: `
          a {
            text-decroation: none;
          }
        `
      },
      {
        name: 'main.css',
        val: '/* this is a main css */'
      }
    ]
  },
  {
    name: 'fonts',
    child: [
      {
        name: 'me.eot',
        val: 'eto'
      },
    ]
  },
  {
    name: 'index.html',
    val: 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>自定义项目结构</title>
  <link rel="stylesheet" href="./styles/reset.css">
  <link rel="stylesheet" href="./styles/public.css">
  <link rel="stylesheet" href="./styles/main.css">
</head>
<body>
  <h2>hello fs!</h2>
  <p>This is a build project!</p>
  <script src="./scripts/util.js"></script>
  <script src="./scripts/apis.js"></script>
  <script src="./scripts/main.js"></script>
</body>
</html>`
  },
];
let port = 3000;

// 自定义项目目录方法
let buildProject = {
  data: {
    current: 0,
    total: 0,
    log: '',
  },
  buildInit (mkDir) {
    this.buildTotal(mkDir);
    this.buildFor(mkDir);
  },
  buildFor (mkDir, path) {
    var self = this;
    for (var i = 0; i < mkDir.length; i++) {
      var name = mkDir[i].name;
      var child = mkDir[i].child;
      var path_block = path ? (path + '/' + name) : name;
      if (name.lastIndexOf('.') === -1) {
        (function(path, child, name) {
          fs.mkdir(path, function(err) {
            if (err) {
              return console.error(err);
            }
            self._nodeTree(++self.data.current, path, name);
            if (child) {
              self.buildFor(child, path);
            }
          })
        })(path_block, child, name);
      } else {
        (function(path, val, name) {
          fs.appendFile(path_block, val ? val : '', 'utf8', function(err) {
            if (err) {
              return console.error(err);
            }
            self._nodeTree(++self.data.current, path, name);
          })
        })(path_block, mkDir[i].val, name);
      }
    }
  },
  buildTotal (arr) {
    console.log('\x1B[90m' + 'Download current js at ' + __dirname + '\x1B[39m')
    var self = this;
    function count (mkDir, j) {
      for (var i = 0; i < mkDir.length; i++) {
        (function(mkDir, i, j){
          var log = log_j(j);
          var name = mkDir[i].name.lastIndexOf('.') === -1 ? mkDir[i].name : ('\x1B[39m' + mkDir[i].name + '\x1B[39m');
          self.data.log += log + '--' + name + '\n';
          if (mkDir[i].child) {
            count(mkDir[i].child, ++j);
          }
          self.data.total++;
        })(mkDir, i, j ? j : 0)
      }
    }
    function log_j (val) {
      var log = '';
      if (val === 0) {
        return '|';
      }
      for (var i = 0; i < val; i++) {
        log += '  ' + '|';
      }
      return '|' + log;
    }
    count(arr);
    console.log('\x1B[90m' + 'Together contains' + this.data.total + 'second execution process.' + '\x1B[90m')
  },
  _nodeTree (current, path, name) {
    console.log('[' + current + '/' + this.data.total + '] \x1B[90m' + name + '\x1B[39m' + '\x1B[32m' + ' installed ' + '\x1B[39m'  + ' at ' + path);
    if (current === this.data.total) {
      console.log('\x1B[32m' + 'All package installed' + this.data.total + ' project install from ' + __dirname + '\x1B[39m');
      console.log('\x1B[35m' + 'Project catalogue: ' + '\x1B[39m');
      console.log(this.data.log + '-------------------------------------');
      console.log(",'''╭⌒╮⌒╮.',''',,',.'',,','',.\n" +
      " ╱◥██◣''o',''',,',.''.'',,',.\n" +
      "｜田｜田田│ '',,',.',''',,',.''\n" +
      "╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬╬" + '\n------------------------------------');
      console.log('\x1B[35m' + 'Make:gitguanqi\nBLOG：https://guanqi.xyz\nGITHUB：https://github.com/gitguanqi' + '\x1B[39m')
      buildServer();
    }
  }
}

// 初始化
buildProject.buildInit(mkDir);

// 构建http请求
function buildServer () {
  const server = http.createServer((req, res) => {
    if (req.url == 'favicon.ico') return;
    if (req.url == '/') {
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      fs.readFile('index.html', function(err, data) {
        if (err) {
          return console.error(err);
        }
        res.write(data);
        res.end();
      })
    } else {
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      res.end();
    }
  });

  server.listen(port, () => {
    console.log('Project build on \x1B[34m http://localhost:' + port + '\x1B[39m');
    console.log('Press to Ctrl + C quit project!');
  })
}
