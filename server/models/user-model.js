const {Schema, model} = require("../config/db/conn");
const Seller = require('./seller-model');
const Buyer = require('./buyer-model');
const OAuthConfig = require('./oauth-model');

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    type: {
        type: Schema.Types.String,
        enum: ['seller', 'buyer'],
    },
    seller: Seller,
    buyer: Buyer,
    createdAt: {
        type: Date,
        default: new Date()
    },
    OAuth: Boolean,
    OAuthConfig: OAuthConfig,
    isAdmin: Boolean,
    country: String,
    postalCode: String,
});

const User = model('User', userSchema);

module.exports = User;