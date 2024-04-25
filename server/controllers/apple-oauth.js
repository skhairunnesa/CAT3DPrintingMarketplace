
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const client = jwsClient({
    jwksUri: 'https://appleid.apple.com/auth/keys'
})

function getAppleSigningKey(kid) {
    return new Promise((resolve) =>{
        client.getSigningKey(kid, (err,key) => {
            if(err){
                consol.error(error)
                resolve(null)
                return
            }
            const signingKey = key.getPublicKey();
            resolve(signingKey)
        })
    })
}

function verify(json, publicKey){
    return new Promise((resolve) => {
        jwt.verify(json, publicKey, (err, payload) => {
            if(err) {
                console.error(err)
                return resolve(null)
            }

            resolve(payload)
        })
    })
}

module.exports = {
    verifyJwt: async (jwt) => {
        return await verify(jwt);
    },

    loginOAuth: async (req, res) => {

        const {provider, response} = req.body

        if(provider === 'apple'){
            //validate apple sign in
            const {identityToken, user} = response.response

            const json = jwt.decode(identityToken, {complete: true})
            const kid = json.header.kid

            const appleKeys = await getAppleSigningKey(kid)

            if(!appleKeys){
                console.error('Something went Wrong')
                return
            }

            const payload = await verify(identityToken, appleKey)

            if(!payload){
                console.error('Something went wrong')
                return
            }

            console.log('Sign in with apple succeeded!', payload)

            if(payload.sub === user && payload.aud === ""){
                //correct user
                //correct authentication against app
                //user is legit and valid sign in request made
            }
        }
    },

    signUpOAuth: async (req, res) => {
        const decoded = jwtDecode.jwtDecode(req.body.oauth.jwt);
        const ableToAdd = !(await alreadyExists(decoded.email));

        return (ableToAdd ? 
                {
                    provider: 'apple',
                    credential: decoded.email
                }
            :
                null
            );
    }
}
