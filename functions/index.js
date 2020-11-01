//FIrebase and Express
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const {getCode} = require('./util/codeHandler')
// (POST) CreateNewAccessCode
// Parameters: phoneNumber
// Return: a random 6-digit access code
// Other requirement: save this access code to the phoneNumber in the database
app.post('/CreateNewAccessCode', getCode);

const{validator} = require('./util/validationHandler')
// (POST) ValidateAccessCode
// Parameters: accessCode, phoneNumber
// Return: { success: true }
// Other requirement: set the access code to empty string once validation is complete
app.post("/ValidateAccessCode", validator)


exports.api = functions.https.onRequest(app);