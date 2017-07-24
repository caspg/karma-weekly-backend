const BASE_REDDIT_URL = 'https://www.reddit.com/r';
const LINKS_LIMIT = 25;

function subredditUrl(subredditName) {
  return `${BASE_REDDIT_URL}/${subredditName}/top/.json?sort=top&t=week&limit=${LINKS_LIMIT}`;
}

function handleResponse(response) {
  return response.data.children.map(child => child.data);
}

function getTopFromLastWeekFactory(getJsonContent) {
  function getTopFromLastWeek(subredditName) {
    const url = subredditUrl(subredditName);

    return getJsonContent(url)
      .then(handleResponse);
  }

  return getTopFromLastWeek;
}

module.exports = getTopFromLastWeekFactory;
