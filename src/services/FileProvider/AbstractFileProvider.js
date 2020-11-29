class AbstractFileProvider {
  /**
   * 
   * @param {string} filename
   * @return {Promise<URI>}
   */
  async getFileURI(filename) {
    throw new Error('unimplemented');
  }

  /**
   * 
   * @param {string} filename
   * @return {Promise<string>}
   */
  async getFile(filename) {
    throw new Error('unimplemented');
  }
}

module.exports = AbstractFileProvider;
