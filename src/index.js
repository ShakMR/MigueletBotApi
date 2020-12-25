const Tracker = require('./Tracking');

const config = require('./config');
const { FileProviderFactory, SOURCE_TYPES} = require('./services/FileProvider/FileProviderFactory');

const chooseFile = require('./randomModule');

const getRandomAudioInfo = async (provider, config) => {
  const audioMapping = await chooseFile(provider, config);
  return {
    ...audioMapping,
    URI: await provider.getFileURI(audioMapping.file),
  };
}

const getRandomAudio = async (provider, config) => {
  const audioMapping = await chooseFile(provider, config);
  return provider.getFile(audioMapping.file);
}

const handler = async function(event, context) {
  const tracker = new Tracker(config.MATOMO);
  
  tracker.trackEvent('lambdaEvent', event);
  tracker.trackEvent('lambdaContext', context);

  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config; 
  
  const [_, base, func] = event.path.split('/'); // info of file
  
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);

  try {
    switch (func) {
      case 'file':
        return (await getRandomAudio(provider, config)).toString('base64');
      case 'info':
        return { data: await getRandomAudioInfo(provider, config), event };
    }
  } catch (err) {
    throw err;
  }
}

exports.handler = handler;
