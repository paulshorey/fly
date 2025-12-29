import http from 'http';

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello World!</h1><p>Your Fly.io Node.js server is running.</p>');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
