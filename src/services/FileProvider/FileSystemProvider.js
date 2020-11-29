const fs = require('fs');
const path = require('path');

const AbstractFileProvider = require('./AbstractFileProvider');

class FileSystemProvider extends AbstractFileProvider {
  constructor(config) {
    super();
    
    this.basePath = config.BASE_PATH 
  }

  async getFileURI(filename) {
    return path.join(this.basePath, filename);
  }
  
  async getFile(filename, encoding) {
    const pathToFile = await this.getFileURI(filename);
    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, { encoding }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }
}

module.exports = FileSystemProvider;
