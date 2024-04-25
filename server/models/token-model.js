const {Schema, model} = require("../config/db/conn");

const tokenSchema = new Schema({
    token: Schema.Types.UUID,
    userId: Schema.Types.ObjectId,
    expires: {
        type: Date,
        default: new Date(new Date().getTime() + (1000 * 3600 * 24 * 7)) // default token expires in a week
    }
});

const Token = model('Token', tokenSchema);

module.exports = Token;