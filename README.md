# 🍐Pear App 🍐

## [Check out the deployed version here!](https://pear-app-459.herokuapp.com)

## About

**A client that enables video calling using React, socket.io-client, simple-peer and secure authentication with Auth0**
This project was build during the 2.5 days hackathon for Codaisseur Academy and was picked as winner by the the Codaisseur judge. The theme for the hackathon was VIDEO and the main requirement was using a technology we never used before.

## Table of contents:

- **[Technologies used](#technologies-used)**
- **[Project setup](#project-setup)**
- **[Configuration](#configuration)**
- **[What is Auth0?](#What-is-Auth0)**

## Technologies used

#### 👇 Click links to view some samples in this project 👇

- **[react](./src/App.js)**
- **[socket.io-client simple-peer](.src/views/Chat.js)**

## Project setup

Use `yarn` or `npm` to install the project dependencies:

```bash
# Using npm..
npm install
```

## Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `src/auth_config.json.example` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}"
}
```

## What is Auth0?

Auth0 helps you to add authentication with multiple authentication sources , either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.

#### Special thanks to @Vinnu1 for the youtube tutorial:

https://www.youtube.com/watch?v=KLCcCTFivhM&t=560s
