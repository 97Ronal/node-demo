const http = require('http');

http.createServer((req, res) => {
  // console.log('req', req);
  res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
  const resData = {
    name: 'xiaozhaohao',
    pwd: 'xiaozhaohao',
    date: [1, 2, 3]
  }
  const str = `
    <body>
      <h1>标题</h1>
      <div>姓名</div>
    </body>
  `
  res.end(str);
  // res.end(JSON.stringify(str));
  // res.end('Hello World\n');
}).listen(8080);
