const AWS = require('aws-sdk');

class SecretService {
  constructor(config) {
    this.client = new AWS.SecretsManager({
      region: config.REGION,
    });
    
    this.secrets = {}
  }
  
  fetch(secretsToFetch) {
    const promises = secretsToFetch.map(secret => {
      this.client.getSecretValue({SecretId: secret}, (err, data) => {
        console.log('Fetching secrets', secret);
        if (err) {
          return console.error(err);
        }
        console.log('Secret found', secret);
        if ('SecretString' in data) {
          this.secrets[secret] = data.SecretString;
        }
      });
    });
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
