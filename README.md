## React Native app using Cognito

Simple react native app using AWS Cognito. Modify config.js to add your user pool ID, app client, id pool:

```
const cognito = {
    REGION: "eu-west-1",
    USER_POOL_ID: "<replace>",
    APP_CLIENT_ID: "<replace>",
    IDENTITY_POOL_ID: "<replace>",
};
```

To set up an AWS cognito stack, see this project: https://github.com/jonnyacl/serverless-app

To run: 
```
yarn install
yarn start
```