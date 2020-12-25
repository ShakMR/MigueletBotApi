const Index = require('./index');

Index.handler({ path: '/quotes/file' }, {})
  .then(console.log)
  .catch(console.error)
