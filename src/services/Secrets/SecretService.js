const AWS = require('aws-sdk');

class SecretService {
  constructor(config) {
    this.client = new AWS.SecretsManager({
      region: config.REGION,
    });
    
    this.secrets = {}
  }
  
  fetch(secretsToFetch) {
    const promises = secretsToFetch.map(secret => new Promise((resolve, reject) => {
        this.client.getSecretValue({SecretId: secret}, (err, data) => {
          console.log('Fetching secrets', secret);
          if (err) {
            console.error(err);
            return reject(err);
          }
          console.log('Secret found', secret);
          if ('SecretString' in data) {
            const secret = JSON.parse(data.SecretString);
            const [key, value] = Object.entries(secret)[0];
            this.secrets[key] = value;
            resolve();
          }
        });
      })
    );
    return Promise.all(promises);
  }
  
  getSecret(secretName) {
    if (!(secretName in this.secrets)) {
      console.error(this.secrets);
      throw new Error(`secret ${secretName} not found`);
    }
    return this.secrets[secretName];
  }
}

module.exports = SecretService;
