# Skipli-Coding-Challenge - Serverside
https://us-central1-skipli-coding-challenge.cloudfunctions.net/api/

- index.js: handling the post requests from the two routes CreateNewAccessCode and ValidateAccessCode
- util/database: initialize Firebase database and return databse module
- util/operators: includes 6-digits-random-code-generatore and phone-number-validator
## (POST) CreateNewAccessCode
    Parameters: phoneNumber
    Return: a random 6-digit access code
    Other requirement: save this access code to the phoneNumber in the database
    - util/codeHandler.js: generating new accesscode and sending generated code is stored in the database along with the phone number and sent to  user through a provided phone number via sms using Twilio api. The provided phone number must has 10 digit numbers, not be empty, otherwise the server will response with the 400 http status code. If there is no error the server will response with the code 200 and {isGenerated: true, isSent: true}
## (POST) ValidateAccessCode
    Parameters: accessCode, phoneNumber
    Return: { success: true }
    Other requirement: set the access code to empty string once validation is complete
    - util/validationHandler.js: getting user provided code and phone number and validating it against the stored code. The requirement for phone number is persisted. Server response with the 400 code if inexistent phone number is provided. The access code in the database is set to an empty string after the validation is success. In case the user provides an empty for the next request, the stored access code is set to not be empty. Otherwise it will return success: {false}