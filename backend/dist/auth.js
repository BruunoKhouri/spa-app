"use strict";
exports.__esModule = true;
exports.handleGet = exports.handleCreation = exports.handleAuthentication = void 0;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
// var obj = require('../db.json');
var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        // const dbUser = obj.users[user.email]
        var dbUser = users_1.users[user.email];
        var token = jwt.sign({ sub: dbUser.email, iss: 'api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
exports.handleAuthentication = handleAuthentication;
var handleCreation = function (req, resp) {
    var _a;
    // const user: User = req.body;
    var user = new users_1.User(req.body.email, req.body.name, req.body.password);
    if (true) {
        var newUser = (_a = {},
            _a["".concat(user.email)] = new users_1.User(user.email, user.name, user.password),
            _a);
        user.addUser(newUser);
        resp.json({ name: newUser.name, email: newUser.email });
        resp.status(500).json({ newUser: newUser, users: users_1.users });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
exports.handleCreation = handleCreation;
var handleGet = function (req, resp) {
    resp.json({ users: users_1.users });
};
exports.handleGet = handleGet;
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
