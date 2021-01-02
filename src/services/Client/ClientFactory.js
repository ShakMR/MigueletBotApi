const telegram = require('./Telegram');

const clients = {
  telegram: telegram,
};

class ClientFactory {
  static create(type, ...args) {
    if (!(type in clients)) {
      throw new Error('Client not found');
    }
    return new clients[type](...args);
  }
}

module.exports = {
  ClientFactory,
  clients
};
