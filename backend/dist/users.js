"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.users = exports.User = void 0;
var jsonServer = require("json-server");
var router = jsonServer.router('db.json');
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    User.prototype.addUser = function (user) {
        exports.users = __assign(__assign({}, exports.users), user);
    };
    return User;
}());
exports.User = User;
exports.users = {
    "joao@gmail.com": new User('joao@gmail.com', 'João', 'joao123'),
    "maria@gmail.com": new User('maria@gmail.com', 'Maria', 'maria123')
};
