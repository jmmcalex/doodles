const Session = require('../account/session');
const { hash } = require('../account/helper')
const AccountTable = require('../account/table');

/**
 * @param username: The user who will have their session cookie set
 * @param res: The object where we will attach the cookie via res.cookie()
 * @param sessionId: If this argument is undefined, a new session must be set in
 *        the db. If the sessionId exists, a cookie is sent out using the sessionId
 */
const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if (sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });
            setSessionCookie({ sessionString, res });
            resolve({ message: 'Session restored' });
        } else {
            session = new Session({ username });
            sessionString = session.toString();

            AccountTable.updateSessionId({ 
                sessionId: session.id, 
                usernameHash: hash(username), 
            })
            .then(() => {
                setSessionCookie({ sessionString, res })
                resolve({ message: 'Session string successfully set' });
            })
            .catch(error => reject(error));
        }
    })
}

const setSessionCookie = ({ sessionString, res }) =>{
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true,
        secure: process.env.MODE == 'production' 
    }); 
}


module.exports = { setSession };