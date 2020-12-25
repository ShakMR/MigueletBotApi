const Index = require('./index');

Index.handler({ func: 'file' }, {})
  .then(console.log)
  .catch(console.error)
