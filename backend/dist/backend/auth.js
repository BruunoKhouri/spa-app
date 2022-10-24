"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.handleGet = exports.handleAuthentication = void 0;
var users_1 = require("./users");
var jwt = __importStar(require("jsonwebtoken"));
var api_config_1 = require("./api-config");
// import * as db from '../db.json' // This import style requires "esModuleInterop", see "side notes"
var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users.find(function (obj) { return obj.email == user.email; });
        var token = jwt.sign({ sub: dbUser.email, iss: 'api' }, api_config_1.apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
exports.handleAuthentication = handleAuthentication;
// export const handleCreation = (req: Request, resp: Response) => {
//     // const user: User = req.body;
//     const user = new User(req.body.email, req.body.name, req.body.password);
//     if (true) {
//         const newUser: { [key: string]: User } = {
//             [`${user.email}`]: new User(user.email, user.name, user.password)
//         }
//         user.addUser(newUser);
//         resp.json({ name: newUser.name, email: newUser.email });
//         resp.status(500).json({ newUser, users });
//     } else {
//         resp.status(403).json({ message: 'Dados inválidos.' });
//     }
// }
var handleGet = function (req, resp) {
    resp.json({ users: users_1.users });
};
exports.handleGet = handleGet;
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users.find(function (obj) { return obj.email == user.email && obj.password == user.password; });
    return dbUser !== undefined;
}
