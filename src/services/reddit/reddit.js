const getTopFromLastWeekFactory = require('./functions/getTopFromLastWeek');

function redditServiceFactory(utils) {
  if (!utils || !utils.getJsonContent) {
    throw Error('utils module must be provided for redditServiceFactory.');
  }

  return {
    getTopFromLastWeek: getTopFromLastWeekFactory(utils.getJsonContent),
  };
}

module.exports = redditServiceFactory;
