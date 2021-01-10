import aws from './aws.config';
import client from './clients.config';
import server from './server.config';
import storage from './storage.config';

const mergedConfig = {
  aws,
  client,
  server,
  storage,
};

export default mergedConfig;
