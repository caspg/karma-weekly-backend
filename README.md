# karma-weekly-backend

Backend for Karma Weekly application, build with [serverless](serverless.com) framework. Hosted on AWS Lambda.

## Links

* live website: [KarmaWeekly.club](https://karmaweekly.club)
* frontend repo: [karma-weekly-front](google.com)

## Tech stack

* [graphql-js](https://github.com/graphql/graphql-js)
* [serverless](https://github.com/serverless/serverless)

## Dependencies

* `aws-sdk v2.54.0` is added as `devDependencies` because it is available in the AWS Lambda execution environment.

## Setting up

* Set ENV variables

  During local development run:

  ```bash
  $ cp .env.example .env
  ```

## License

The project is available as open source under the terms of the MIT License.
