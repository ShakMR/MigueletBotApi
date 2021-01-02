const Index = require('./index');

Index.handler({ 
  path: '/quotes',
  queryStringParameters: {
    client: 'telegram',
  },
  body: JSON.stringify({
    message: {
      chat: {
        id: 'id',
      },
      text: 'caca',
    }
  })
},
{
  dry_run: true,
},
  {})
  .then(console.log)
  .catch(console.error)
