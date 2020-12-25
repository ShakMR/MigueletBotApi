const chooseFile = async (provider, config) => {
  const mapping = JSON.parse(await provider.getFile(config.MAPPING_FILE));
  const nAudios = mapping.length;
  const randIndex = Math.floor(Math.random() * nAudios);
  return mapping[randIndex];
}

module.exports = chooseFile;
