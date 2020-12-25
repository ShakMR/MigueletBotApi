const MatomoTracker = require('matomo-tracker');

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
  const matomo = new MatomoTracker(config.MATOMO.SITE_ID, config.MATOMO.URL);
  matomo.on('error', function(err) {
    throw err;
  });
  
  matomo.track({
    url: `https://lambda/${event.path}`,
    action_name: 'Lambda Init',
    cvar: JSON.stringify({
      '1': ['event', event],
      '2': ['context', context],
    })
  })

  matomo.track({
    url: `https://lambda/${event.path}`,
    e_c: 'info log',
    e_a: 'init',
    e_n: 'event',
    e_v: JSON.stringify(event),
  });

  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config; 
  
  const [_, base, func] = event.path.split('/'); // info of file
  
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);

  try {
    switch (func) {
      case 'file':
        return (await getRandomAudio(provider, config)).toString('base64');
      case 'info':
        return await getRandomAudioInfo(provider, config);
    }
  } catch (err) {
    matomo.track({
      url: 'lambda-error',
      action_name: 'Error',
      error: err,
      error_json: JSON.stringify(err),
    })
    throw err;
  }
}

exports.handler = handler;
