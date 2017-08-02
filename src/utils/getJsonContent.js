const https = require('https');

function parseJson(body) {
  return JSON.parse(body.join(''));
}

/**
 * @param {string} url
 * @returns {promise}
 */
function getJsonContent(url) {
  if (!url.startsWith('https')) {
    throw Error('Provided url must starts with "https".');
  }

  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Faild to load page, status code: ${response.statusCode}`));
      }

      const body = [];

      response.on('data', chunk => body.push(chunk));

      response.on('end', () => resolve(parseJson(body)));
    });

    request.on('error', error => reject(error));
  });
}

module.exports = getJsonContent;
