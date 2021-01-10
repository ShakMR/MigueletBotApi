const { SOURCE_TYPE, BASE_PATH = '../' } = process.env;

export default {
  MAPPING_FILE: 'mapping.json',
  SOURCE_TYPE: SOURCE_TYPE || 'S3',
  S3: {
    BUCKET: 'miguelet-audios',
    BUCKET_PREFIX: 'files/',
    REGION: 'eu-west-3',
  },
  FS: {
    BASE_PATH: BASE_PATH,
  },
};
