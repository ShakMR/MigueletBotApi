/**
 * 
 * @param {AbstractFileProvider} provider
 * @param {Object} config
 */
const getRandomAudio = async (provider, config) => {
  const mapping = JSON.parse(await provider.getFile(config.MAPPING_FILE));
  const nAudios = mapping.length;
  const randIndex = Math.floor(Math.random() * nAudios);
  const audioMapping = mapping[randIndex];
  return {
    ...audioMapping,
    URI: await provider.getFileURI(audioMapping.file),
  };
}

module.exports = getRandomAudio;
