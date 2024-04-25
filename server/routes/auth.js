const { signup, login } = require("../controllers/auth-controller");
const User = require('../models/user-model');

module.exports = (app) => {
    app.post("/auth/signup", async (request, response) => {
        await signup(request, response);
    });

    app.post("/auth/login", async (request, response) => {
        await login(request, response);
    });
};
