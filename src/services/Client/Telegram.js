const fetch = require('node-fetch');

class Telegram {
  constructor(config, secret, params, dry_run) {
    this.botUrl = config.telegram.url + secret.getSecret(config.telegram.token);
    
    const body = JSON.parse(params);
    this.chatId = body.message.chat.id;
    this.text = body.message.text;
    this.dry_run = dry_run;
  }
  
  resolveCommand() {
    switch (true) {
      case /^\/random$/.test(this.text):
        return {
          command: 'random'
        };
      default:
        return {
          command: 'tags',
          tags: this.text.split(' '),
        };
    }    
  }
  
  sendAudio(audioURI) {
    const url = `${this.botUrl}/sendAudio?chat_id=${this.chatId}&audio=${encodeURIComponent(audioURI)}`;
    console.log(url);
    if (!this.dry_run) {
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => console.log(resp))
        .catch((err) => console.error(err));
    }
  }
}

module.exports = Telegram;
