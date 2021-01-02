const fetch = require('node-fetch');

class Telegram {
  constructor(config, secret, params) {
    this.botUrl = config.telegram.url + secret.getSecret(config.telegram.token);
    
    const body = JSON.parse(params);
    this.chatId = body.message.chat.id;
  }
  
  sendAudio(audioURI) {
    const url = `${this.botUrl}/sendAudio?chat_id=${this.chatId}&audio=${encodeURIComponent(audioURI)}`;
    console.log(url);
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
  }
}

module.exports = Telegram;
