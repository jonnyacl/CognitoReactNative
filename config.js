const cognito = {
    REGION: "eu-west-1",
    USER_POOL_ID: "<replace>",
    APP_CLIENT_ID: "<replace>",
    IDENTITY_POOL_ID: "<replace>",
  };
  
  const api = {
    endpoint: "<replace>",
    region: "eu-west-1",
  };
  module.exports = {
    env: process.env.REACT_APP_ENV,
    cognito,
    api,
  };
  