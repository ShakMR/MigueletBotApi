const MatomoTracker = require('matomo-tracker');

const config = require('./config');
const { FileProviderFactory, SOURCE_TYPES} = require('./services/FileProvider/FileProviderFactory');

const getRandomAudio = require('./randomModule');

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
  
  const provider = FileProviderFactory.create(SOURCE_TYPES[SOURCE_TYPE], providerConfig);

  try {
    return getRandomAudio(provider, config);
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

if (require.main === module) {
  handler({}, {})
    .then(console.log)
    .catch(console.error)
}

exports.handler = handler;
