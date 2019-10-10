# Pear app

### A client that enables video calling using React, socket.io-client, simple-peer and secure authentication with Auth0

## Project setup

Use `yarn` or `npm` to install the project dependencies:

````bash
# Using npm..
npm install

### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `src/auth_config.json.example` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}"
}
````

## Deployment

https://pear-app-459.herokuapp.com

## What is Auth0?

Auth0 helps you to add authentication with multiple authentication sources , either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
