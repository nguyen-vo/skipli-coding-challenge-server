const {phoneValidator} = require('./operators');
const {db} = require('./database');

validator = (req, res) => {
    //Getting phoneNumber and access codefrom the front-end
    let {
        phoneNumber,
        accessCode: userCode
    } = req.body;
    const phoneNum = phoneNumber.trim();
    
    //Catch an empty phoneNumber field
    if (!(phoneValidator(phoneNumber))) {
        res.status(400).json({
            success: false,
            message: "Phone number must not be empty and must have 10 digits number"
        });
    } else {
        let storedCode;

        //Retreiving user data from the database
        userRef = db.ref("users/" + phoneNum);
        userRef.once('value', (snapshot) => {
            if (snapshot.val() === null) {
                //the provided phoneNumber does not exist.
                res.status(400).json({
                    success: false,
                    message: "Provided phone number does not exist"
                })
            } else {
                //Validating
                storedCode = snapshot.val().accessCode;
                if (userCode === storedCode && storedCode !== '') {
                    //Empty accesscode
                    storedCode = "";
                    userCode = "";
                    //Emptycode in database
                    userRef.update({
                        accessCode: storedCode
                    })
                    res.status(200).json({
                        success: true,
                        message: 'Access Granted!!',
                        isGenerated: false,
                    });

                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid Code!!',
                        isGenerated: true
                    })
                }
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                general: "Something went wrong. Please try again"
            })
        })
    }
}

module.exports = {validator}