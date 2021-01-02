const Index = require('./index');

Index.handler({ 
  path: '/quotes',
  queryStringParameters: {
    client: 'telegram',
  },
  body: {
    message: {
      chat: {
        id: 'id',
      }
    }
  }
},
  {})
  .then(console.log)
  .catch(console.error)
