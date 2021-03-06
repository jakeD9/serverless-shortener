# TODO Items:
* browser extension!
* get an actual domain name
* add increment hits value on get
* look into using dynamodb UPDATE instead of PUT, consider uniqueness of url key
* add unit tests

# About
Live Demo [here](https://d2mkisxifke36n.cloudfront.net)

This is a lightweight serverless URL shortening tool built using Serverless Stack (SST). It contains a basic UI and a browser extension (TBD).
To run locally, you'll need to setup an AWS account. You can follow SST's [documentation steps](https://serverless-stack.com/chapters/create-an-aws-account.html) for quick and easy setup.

# Getting Started with Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

Start by installing the dependencies.

```bash
$ yarn install
```

## Commands

### `yarn run start`

Starts the local Lambda development environment.

### `yarn run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `yarn run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `yarn run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `yarn run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack) or [post on our forums](https://discourse.serverless-stack.com).
