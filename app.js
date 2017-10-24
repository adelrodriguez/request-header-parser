const express = require('express');

const app = express();

function getAddress(req) {
  const ip = req.headers['x-forwarded-for'] || req.ip;

  return ip.split(',')[0];
}

function parseLanguage(input) {
  return input.split(',')[0];
}

function parseSoftware(input) {
  // RegExp catches whatever is inside the first set of parentheses
  return input.match(/\(([^)]+)\)/)[1];
}

app.get('/', (req, res) => {
  const result = {
    ipaddress: getAddress(req),
    language: parseLanguage(req.get('accept-language')),
    software: parseSoftware(req.get('user-agent'))
  }
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server has started...");
});