const { URL } = require('url');
const fetch = require('node-fetch');

const buildURL = (url, json) => {
  const newUrl = new URL(url); 
  Object.entries(json).forEach(
    ([key, value]) => newUrl.searchParams.append(key, value),
  );
  return newUrl;
}

class Tracker {
  constructor(config) {
    this.id = config.SITE_ID;
    this.url = config.URL;
  }
  
  trackEvent(event_name, event_value) {
    const params = {
      siteId: this.id,
      url: 'https://lambda.suilabs.com/event',
      e_c: 'track',
      e_a: event_name,
      e_n: event_name,
      e_v: typeof event_value === 'object' ? JSON.stringify(event_value) : event_value,
      cvar: JSON.stringify({
        '1': ['event', event_name],
        '2': ['value', event_value],
      })
    }
    
    const trackerEndpoint = buildURL(this.url, params);
    fetch(trackerEndpoint)
  }
}

module.exports = Tracker;
