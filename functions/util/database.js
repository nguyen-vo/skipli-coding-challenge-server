const admin = require('firebase-admin');
//Initialize Firebase
var serviceAccount = require("../skipli-coding-challenge-firebase-adminsdk-7xw1o-05a9a16768.json");
const {
    user
} = require('firebase-functions/lib/providers/auth');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://skipli-coding-challenge.firebaseio.com"
});
const db = admin.database();

module.exports = {db}