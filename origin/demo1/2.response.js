const http = require('http');

http.createServer((req, res) => {
  console.log('req', req);
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('Hello World\n');
  /**
   * TODO
   *  1. 返回JSON
   *  2. 返回HTML
   *  3. 监听文件变化 返回HTML
   */
}).listen(8080);
