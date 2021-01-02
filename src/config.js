const {
  SOURCE_TYPE,
  BASE_PATH = '../',
} = process.env;

module.exports = {
  REGION: 'eu-west-3',
  MATOMO: {
    URL: 'https://mordor.suilabs.com/piwik.php',
    SITE_ID: 6,
  },
  SOURCE_TYPE: SOURCE_TYPE || 'S3',
  S3: {
    BUCKET: 'miguelet-audios',
    BUCKET_PREFIX: 'files/',
    REGION: 'eu-west-3',
  },
  FS: {
    BASE_PATH: BASE_PATH,
  },
  MAPPING_FILE: 'mapping.json',
  
  telegram: {
    url: 'https://api.telegram.org/bot',
    token: 'telegram_token',
  },
  secrets: [
    'telegram_bot_token',
  ]
}
