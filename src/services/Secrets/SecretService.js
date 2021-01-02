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
        if (err) {
          return console.error(err);
        }
        if ('SecretString' in data) {
          this.secrets[secret] = data.SecretString;
        }
      });
    });
    return Promise.all(promises);
  }
  
  getSecret(secretName) {
    if (!(secretName in this.secrets)) {
      throw new Error(`secret ${secretName} not found`);
    }
    return this.secrets[secretName];
  }
}

module.exports = SecretService;
