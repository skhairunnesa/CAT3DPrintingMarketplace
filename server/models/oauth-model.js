const {Schema, model} = require("../config/db/conn");

const oauthConfigSchema = new Schema({
    upstreamProvider: {
        type: String,
        enum: ['google', 'facebook', 'caterpillar', 'pearson']
    },
    credential: String
});

module.exports = oauthConfigSchema;