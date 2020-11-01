
const {db} = require('./database');
const {randGenerator, phoneValidator} = require('./operators');

//Initialize Twilio
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

getCode = (req, res) => {
    //Getting phoneNumber from the front-end
    const phoneNum = req.body.phoneNumber.replace(/\D+/g,"");
    const code = randGenerator().toString();
    
    //Catch an empty phoneNumber field
    if (!phoneValidator(phoneNum)) {
        res.status(400).json({
            isGenerated: false,
            message: "Phone Number must not be empty and must have 10 digits number"
        })
    } else {
        //Generating and writing accessCode to the database 
        //Path: users/phoneNumber/accessCode
        const userRef = db.ref("users");
        userRef.child(phoneNum).set({
            accessCode: code
        }).then(() => {
            //Sending AccessCode to the user
            const message = 'Your access code is ' + code;
            client.messages.create({
                body: message,
                from: '+15038226126',
                to: '+1' + phoneNum //assuming provided phoneNumber is in the U.S
            })
            res.status(200).json({
                isGenerated: true,
                message: ""
            })

        }).catch((err) => {
            res.status(500).json({
                isGenerated: false,
                message: "Something went wrong. Please try again"
            })
        });
    }
}
module.exports = {getCode}