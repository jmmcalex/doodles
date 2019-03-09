const { Router } = require('express');
const AccountTable = require('../account/table');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const { setSession } = require('../api/helper');

const router = new Router();

/**
 * @param username: The name of the user to be saved to the account table
 * @param password: The pass word of the user to be saved to the account table 
 * @summary Sets up the usernameHash, passwordHash, and sessionId in the account table
 *          It returns an error if a username is already taken or if there is a problem 
 *          setting the session cookie in the http response.
 */
// router.post('/signup', (req, res, next) => {
//     // console.log('signing up for account');
//     const { username, password } = req.body;
//     const usernameHash = hash(username);
//     const passwordHash = hash(password);
//     // console.log('checking if account exists');
//     AccountTable.getAccount({ usernameHash })
//         .then(({ account }) => {
//             if(!account){ 
//                 // console.log('account does not yet exist, storing new account');
//                 return AccountTable.storeAccount({ usernameHash, passwordHash })
//             } else {
//                 const error = new Error('This username has already been taken')
//                 error.statusCode = 409;
//                 throw error;
//             }
//         })
//         .then(() => {
//             // console.log('account now stored, setting session cookie in browser');
//             return setSession({ username, res });
//         })
//         .then(({ message }) => {
//             res.json({ message });
//         })
//         .catch(error => next(error));
// })



router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
            if (account && account.passwordHash === hash(password)) {
                const { sessionId } = account;
                return setSession({ username, res, sessionId })
            } else {
                const error = new Error('Incorrect username/password');
                error.statusCode = 409;
                throw error;
            }
        })
        .then( ({ message }) => {
            res.json({ message });
        }) 
        .catch(error => next(error));
})


/**
 * @param req.cookies.sessionString: Requests to this route will have this cookie.
 * @summary This will remove the sessionId from the account table and will clear the 
 *          clients session cookie
 */
router.get('/logout', (req, res, next) => { 
    console.log('logging out');
    const { username } = Session.parse(req.cookies.sessionString);
    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    })
    .then(() => {
        res.clearCookie('sessionString');
        res.json({ message: 'Successful logout'})
    })
    .catch(error => next(error));

})


/**
 * @param req.cookies.sessionString: The 'sessionString' is a variable that is 
 *  supposedly on the request object, if the user still has a valid session
 *  i.e. they have not logged out.
 * @summary If the sessionString is set and the session can be verified, by checking
 * its CRC code then we respond with a boolean named authenticated. Otherwise
 * we respond by throwing an error
 */
router.get('/authenticated', (req, res, next) => {
    // console.log('Checking if client session is set and authentic...');
    const { sessionString } = req.cookies;
    if (!sessionString || !Session.verify(sessionString)) {
        // console.log('invalid session');
        const error = new Error('Invalid session');
        error.statusCode = 400;
        return next(error);
    } else {
        // console.log('Session string is valid. Authenticating against DB...');
        const { username, id } = Session.parse(sessionString);
        const usernameHash = hash(username);
        AccountTable.getAccount({ usernameHash })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
                // console.log('Session is authentic:', authenticated);
                res.json({ authenticated });
            })
            .catch(error => next(error));
    }
})

module.exports = router;