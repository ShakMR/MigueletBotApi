const fs = require('fs');
const path = require('path');

const FileSystemProvider = require('../src/services/FileProvider/FileSystemProvider');

describe('FileSystemProvider', () => {
  describe('getFileURI', () => {
    it('returns filename concatenated to basepath', async () => {
      const fsProvider = new FileSystemProvider({ BASE_PATH: '../src' });
      
      const URI = await fsProvider.getFileURI('filename');
      
      expect(URI).toBe(`..${path.sep}src${path.sep}filename`);
    })
  });
  
  describe('getFile', () => {
    it('returns file content', async () => {
      const expectedContent = 'TEXT';
      const testFilePath = 'filename';
      fs.writeFileSync(testFilePath, expectedContent);
      
      const fsProvider = new FileSystemProvider({ BASE_PATH: '.' });

      const content = await fsProvider.getFile(testFilePath, 'utf8');

      expect(content).toBe(expectedContent);
      fs.unlinkSync(testFilePath);
    })
  });
});
