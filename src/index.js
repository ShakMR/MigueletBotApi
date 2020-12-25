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
    event: JSON.stringify(event),
    context: JSON.stringify(context)
  })

  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config; 
  
  const { func } = event; // info of file
  
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);

  console.log('SOURCE', SOURCE_TYPE, 'FUNCTION', func);
  try {
    switch (func) {
      case 'file':
        return {
          headers: { "Content-Type": "image/png" },
          statusCode: 200,
          body: (await getRandomAudio(provider, config)).toString('base64'),
          isBase64Encoded: true
        };
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
