function sendSubredditNewslettersFactory(usersService) {
  if (!usersService) {
    throw Error('usersService is required in sendSubredditNewsletters.');
  }

  // Services needed:
  //   1. userService -> fetch all users
  //   2. dynamodbService -> fetch subreddit issue, save subreddit issue
  //   3. redditService -> fetch json data from subreddit
  //   4. mailerService -> send subreddit's issue to the user

  /**
   * 1. fetch all users recursively -> DYNAMODB only returns 1MB of data
   *    - https://stackoverflow.com/questions/25241864/recursive-fetch-all-items-in-dynamodb-query-using-node-js
   * 2. iterate over each user
      * 3. iterate over each user's subreddit
          * 4. fetch latest subreddit's issue from DynamoDb. Check if exist
          *    4.1 NO
          *      4.1.1 Fetch json data from subreddit
          *      4.1.2 Parse raw json data
          *      4.1.3 Save subreddit issue in DynamoDB
          *   4.2. YES -> do nothing
          * 5. Send email to user with subreddits data
   */
}

module.exports = sendSubredditNewslettersFactory;
