// old way of creating a basic http server (no express)
const http = require('http');

http.createServer((req, res) => {
    res.write('Coding School NodeJS Http Server is live!');
    res.end();
}).listen(4040)

