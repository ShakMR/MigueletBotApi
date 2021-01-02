const MatomoTracker = require('matomo-tracker');

const config = require('./config');
const { FileProviderFactory, SOURCE_TYPES} = require('./services/FileProvider/FileProviderFactory');
const { ClientFactory } = require('./services/Client/ClientFactory');
const SecretService = require('./services/Secrets/SecretService');

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

  console.log(JSON.stringify(event));
  
  const secretService = new SecretService(config);
  await secretService.fetch(config.secrets);
  
  const { client: clientParam } = event.queryStringParameters;
  
  const { body } = event;
  
  const client = ClientFactory.create(clientParam, config, secretService, body);
  
  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config;
     
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);
  
  try {
    const audio = await getRandomAudioInfo(provider, config);
    client.sendAudio(audio.URI);
    return {
      statusCode: 200,
    };
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
