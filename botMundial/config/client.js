// LLamando a las librerias y la api
const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

// Habilitar Credenciales

const client = new TwitterApi({
  appKey: Process.env.appKey || '...',
  appSecret: Process.env.appSecret || '...',
  accessToken: Process.env.accessToken || '...',
  accessSecret: Process.env.accessSecret || '...',
});

// Habilita las credenciales de twitter
const rwClient = client.readWrite;

module.exports = rwClient;
