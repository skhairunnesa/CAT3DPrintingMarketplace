const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/user-model');
const sessionAuth = require('./session-control');
const facebookAppId = 737362851712100; //TEMP, should be implemented in .env
const facebookAppSecret = '2781320ddf397f581abf3cbff18d078f'; //TEMP, should be implemented in .env

// Initialize Facebook token strategy
passport.use(new FacebookTokenStrategy({
    clientID: facebookAppId,
    clientSecret: facebookAppSecret,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 'OAuthConfig.credential': profile.id });

        if (!user) {
            // Redirect to sign-up page if user doesn't exist
            return done(null, false, { message: 'User not found. Please sign up.' });
        }

        // User found, authenticate and create session
        const t = await sessionAuth.beginSession(user);
        return done(null, user, { token: t });
    } catch (err) {
        return done(err);
    }
}));

const authenticateFacebookToken = passport.authenticate('facebook-token', { session: false });

module.exports = {
    authenticateFacebookToken,
};

