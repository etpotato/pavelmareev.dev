const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.resolve('dist')));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`✓ server is listening on port ${port}`);
});

const shutdownGracefully = (exitArg = 0) => server.close(() => {
  console.log('\n× server closed');
  process.exit(exitArg);
});

process.once('uncaughtException', (err) => {
  console.error(err);
  shutdownGracefully(1);
});
process.once('SIGTERM', shutdownGracefully);
process.once('SIGINT', shutdownGracefully);
