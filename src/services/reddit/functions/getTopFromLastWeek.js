const BASE_REDDIT_URL = 'https://www.reddit.com/r';
const LINKS_LIMIT = 25;

function subredditUrl(subredditName) {
  return `${BASE_REDDIT_URL}/${subredditName}/top/.json?sort=top&t=week&limit=${LINKS_LIMIT}`;
}

function getChildren(response) {
  return response.data.children;
}

function mapChildrenData(children) {
  return children.map(({ data }) => ({
    title: data.title,
    permalink: data.permalink,
    commentsNum: data.num_comments,
    score: data.score,
  }));
}

function getTopFromLastWeekFactory(getJsonContent) {
  function getTopFromLastWeek(subredditName) {
    const url = subredditUrl(subredditName);

    return getJsonContent(url)
      .then(getChildren)
      .then(mapChildrenData);
  }

  return getTopFromLastWeek;
}

module.exports = getTopFromLastWeekFactory;
