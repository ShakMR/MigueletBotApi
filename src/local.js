const Index = require('./index');

Index.handler({ func: 'info' }, {})
  .then(console.log)
  .catch(console.error)
