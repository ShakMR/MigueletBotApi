const FileSystemProvider = require('./FileSystemProvider');
const S3Provider = require('./S3Provider');

const SourcesTypes = {
  S3: S3Provider,
  FS: FileSystemProvider,
};

const SOURCE_TYPES = {
  S3: 'S3',
  FS: 'FS',
};

class FileProviderFactory {
  static create(type, ...args) {
    return new SourcesTypes[type](...args); 
  }
}

module.exports = {
  FileProviderFactory,
  SOURCE_TYPES
};
