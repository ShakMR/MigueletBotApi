const AWS = require('aws-sdk');

const AbstractFileProvider = require('./AbstractFileProvider');

class S3Provider extends AbstractFileProvider {
  constructor(config) {
    super();
    this.s3 = new AWS.S3({ 
      region: config.REGION
      
    });  
    this.bucket = config.BUCKET;
    this.prefix = config.BUCKET_PREFIX;
    this.region = config.REGION;
  }
  
  buildParams(key, extra = {}) {
    return {
      Bucket: this.bucket,
      Key: `${this.prefix}${key}`,
        ...extra,
    }
  } 
  
  async getFileURI(filename) {
    const params = this.buildParams(filename);
    
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', params, (err, url) => {
        err ? reject(err) : resolve(url);
      });
    });
  }
  
  async getFile(filename) {
    const params = this.buildParams(filename)
    const file = await this.s3.getObject(params).promise();
    return file.Body;
  }
}

module.exports = S3Provider;
