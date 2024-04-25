const {loginOAuth, verifyJwt} = require("../controllers/apple-oauth");
const User = require('../models/user-model');

module.exports = (app) => {
    app.post("/oauth/apple", async (request, response) => {
        if (await verifyJwt(request.body.jwt)) {
            if (await loginOAuth(request, response)) {
                return;
            }
            else if (signUpOAuth(request, response)) {
                return;
            }
            else {
                response.status(400).send({
                    status: 'failed',
                    reason: 'unknown :: bad OAuth credentials'
                })
            }
        }
        else {
            response.status(401).send({
                status: 'failed',
                reason: 'invalid Apple OAuth token'
            })
        }
    });
}