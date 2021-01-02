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
  matomo.track({
    url: "lambda",
    action_name: 'Lambda Init',
    cvar: JSON.stringify({
      '1': ['event', event],
      '2': ['context', context],
    })
  })

  matomo.track({
    url: `lambda`,
    e_c: 'info log',
    e_a: 'init',
    e_n: 'event',
    e_v: JSON.stringify(event),
  });

  console.log(JSON.stringify(event));
  
  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config; 
  
  const [_, base, func] = event.path.split('/'); // info of file
  
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);

  try {
    switch (func) {
      case 'file':
        return {
          headers: { "Content-Type": "audio/mpeg" },
          statusCode: 200,
          body: (await getRandomAudio(provider, config)).toString('base64'),
          isBase64Encoded: true
        }
      case 'info':
        return {
          headers: { "Content-Type": "application/json" },
          statusCode: 200,
          body: { data: await getRandomAudioInfo(provider, config) },
          isBase64Encoded: false
        }
    }
  } catch (err) {
    matomo.track({
      url: 'lambda-error',
      action_name: 'Error',
      error: err,
      error_json: JSON.stringify(err),
    })
    console.error(err);
    return {
      statusCode: 500,
    }
  }
}

exports.handler = handler;
