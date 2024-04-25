const { 
    v4: uuidv4
} = require('uuid');
const Token = require('../models/token-model');

module.exports = {
    verifyToken: async (token) => {
        let t = await Token.findOne({
            token: token
        });
        if (new Date(t.expires) < new Date()) {
            return undefined;
        }
        return t;
    },
    beginSession: async (user) => {
        const t = uuidv4();
        const token = {
            user: user._id,
            token: t,
            expires: new Date(new Date().getTime() + (1000 * 3600 * 24 * 7))
        };
        await Token.create(token);
        return token;
    },
    verifyRequest: async (request) => {
        const token = request.headers['Authorization'];
        return await this.verifyToken(token);
    }
}