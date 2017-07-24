const getTopFromLastWeekFactory = require('./functions/getTopFromLastWeek');

function redditServiceFactory(getJsonContent) {
  if (!getJsonContent) {
    throw Error('getJsonContent must be provided for redditServiceFactory.');
  }

  return {
    getTopFromLastWeek: getTopFromLastWeekFactory(getJsonContent),
  };
}

module.exports = redditServiceFactory;
