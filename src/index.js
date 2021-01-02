const MatomoTracker = require('matomo-tracker');

const config = require('./config');
const { FileProviderFactory, SOURCE_TYPES} = require('./services/FileProvider/FileProviderFactory');
const { ClientFactory } = require('./services/Client/ClientFactory');
const SecretService = require('./services/Secrets/SecretService');

const randomModule = require('./strategies/random');
const SearchByTags = require('./strategies/searchByTag');

const getAudioInfo = async (strategy, provider, config, ...extra) => {
  const audioMapping = await strategy.chooseFile(provider, config, ...extra);
  if (audioMapping) {
    return {
      ...audioMapping,
      URI: await provider.getFileURI(audioMapping.file),
    };
  }
  return null;
}

const commandsMap = {
  random: randomModule,
  tags: SearchByTags,
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
  
  const dry_run = context.dry_run || false;
  
  const secretService = new SecretService(config, dry_run);
  if (!dry_run) {
    await secretService.fetch(config.secrets);
  }
  
  const { client: clientParam } = event.queryStringParameters;
  
  const { body } = event;
  
  const client = ClientFactory.create(clientParam, config, secretService, body, dry_run);
  const { command, ...extraCommandParams } = client.resolveCommand();
  
  const { SOURCE_TYPE } = config;
  const { [SOURCE_TYPE]: providerConfig } = config;
     
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);
  
  try {
    const audio = await getAudioInfo(commandsMap[command], provider, config, extraCommandParams);
    if (audio) {
      client.sendAudio(audio.URI);
      return {
        statusCode: 200,
        body: audio
      };
    }
    return {
      statusCode: 404,
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
