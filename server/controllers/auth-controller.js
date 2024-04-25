const User = require('../models/user-model');
const argon = require("argon2");
const sessionAuth = require("./session-control");
const { canSignUpOAuth } = require("./google-oauth");
const { fbOauthLogin } = require("./fb-oauth");

module.exports = {
    signup: async (request, response) => {
        if (!request.body.firstName || !request.body.lastName || !request.body.type) 
        {
            response.status(400).send({
                status: 'failed',
                reason: 'not enough required information'
            });
            return;
        }
        if (!request.body.oauthUser && request.body.password.length < 16) {
            response.status(400).send({
                status: 'failed',
                reason: 'password does not meet requirements, must be 16 characters long'
            });
            return;
        }

        if (!request.body.oauthUser && (!request.body.email || !request.body.password)){
            response.status(400).send({
                status: 'failed',
                reason: 'not enough required information'
            });
            return;
        }


        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        
        if (!request.body.oauthUser && !emailRegex.exec(request.body.email)) {
            response.status(400).send({
                status: 'failed',
                reason: 'That doesn\'t look like an email'
            });
            return;
        }

        let obj = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: (request.body.oauthUser ? null : request.body.email),
            password: (request.body.oauthUser ? undefined : await argon.hash(request.body.password)),
            type: request.body.type,
            country: request.body.country
        };

        if (request.body.oauthUser) {
            obj.OAuth = true;
            if (request.body.oauth.source === 'google') {
                const oauthObj = await canSignUpOAuth(request, response);
                if (oauthObj === null) {
                    response.status(400).send({
                        status: 'failed',
                        reason: 'Already signed up with Google. Go to Login.'
                    });
                    return;
                }
                obj.OAuthConfig = oauthObj;
            }
            else if (request.body.oauth.source === 'facebook') {
                
            }
            else if (request.body.oauth.source === 'pearson') {
                
            }
        }
        else { 
            obj.OAuth = false;
        }

        const exists = await User.findOne({
            email: obj.email
        });
        
        if (exists && exists.email != null) {
            response.status(400).send({
                status: 'failed',
                reason: 'user with that email already exists (did you sign up with google or facebook already?)'
            });
            return;
        }

        try {
            if (request.body.type === 'seller') { 
                obj.seller = request.body.seller;
                obj.seller.subType = obj.seller.subType.toLowerCase();
            }
            else if (request.body.type === 'buyer') { 
                obj.buyer = request.body.buyer;
            }
            obj.isAdmin = false;
            await User.create(obj);
            response.send({
                status: 'success',
            });
            return;
        }
        catch (e) {
            console.log(e);
            response.status(500).send({
                status: 'failed',
                reason: 'database error',
            });
            return;
        }

    },
    login: async (request, response) => {
        if (!request.body.email || !request.body.password) {
            response.status(400).send({
                status: 'failed',
                reason: 'missing required information'
            });
            return;
        }
        let toAuth = await User.findOne({
            email: request.body.email
        });

        if (toAuth) {
            const authResult = await argon.verify(toAuth.password, request.body.password);
            if (authResult) {
                const t = await sessionAuth.beginSession(toAuth);
                const redacted = {...toAuth._doc, password: undefined};
                response.send({
                    status: 'success',
                    token: t,
                    user: redacted,
                });
                return;
            }
            else {
                response.status(401).send({
                    status: 'failed',
                    reason: 'invalid password or email'
                });
                return;
            }
        }
        else {
            response.status(401).send({
                status: 'failed',
                reason: 'invalid password or email'
            });
            return;
        }
    },
    googleOauthLogin: (jwt) => {

    },
    fbOauthLogin: async (jwt) => {
        await fbOauthLogin(jwt);
    }
}