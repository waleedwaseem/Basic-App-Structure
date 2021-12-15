process.env.NODE_ENV = 'test';
const config = require('../../config');
const app = require('./mockApp');
const port = config.get('port');

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

module.exports = {
  app: app,
};
