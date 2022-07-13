// const base = require('airtable').base('appvipAS3ThYCcIc3');
const express = require("express");
const router = express.Router();

var Airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base('appvipAS3ThYCcIc3');