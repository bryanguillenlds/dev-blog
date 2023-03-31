const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

//function to be exported to add a user as an Admin
//When this function is called we run some callbacks to authenticate the user by email and id
//and set it as an admin, then send a success message or a failure.
exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made an admin!!`,
            };
        })
        .catch((err) => {
            console.log(err);
        });
});