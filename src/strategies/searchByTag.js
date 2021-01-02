const chooseFile = async (provider, config, { tags }) => {
  const mapping = JSON.parse(await provider.getFile(config.MAPPING_FILE));
  const selectedFiles = mapping.reduce((files, filesMapping) => {
    const matchingTags = filesMapping.tags.filter(tag => tags.includes(tag));
    if (matchingTags.length > 0) {
      files.push([filesMapping, matchingTags.length]);
    }
    return files;
  }, []);
  selectedFiles.sort((a, b) => b[1] - a[1]);
  return (selectedFiles[0] || [])[0];
}

module.exports = {
  chooseFile
};
