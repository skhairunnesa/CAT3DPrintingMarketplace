const {loginOAuth, verifyJwt, canSignUpOAuth} = require("../controllers/google-oauth");
const User = require('../models/user-model');

module.exports = (app) => {
    app.post("/oauth/google", async (request, response) => {
        if (await verifyJwt(request.body.oauth.jwt)) {
            if (await loginOAuth(request, response)) {
                return;
            }
            else if (canSignUpOAuth(request, response)) {
                response.send({
                    status: 'success',
                    needsSignup: true
                })
                return;
            }
            else {
                response.status(400).send({
                    status: 'failed',
                    reason: 'unknown :: bad OAuth credentials'
                })
                return;
            }
        }
        else {
            response.status(401).send({
                status: 'failed',
                reason: 'invalid Google OAuth token'
            });
            return;
        }
    });

    app.post("/oauth/facebook", async (request, response) => {
    });

};