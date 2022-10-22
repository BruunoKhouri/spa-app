"use strict";
exports.__esModule = true;
exports.users = exports.User = void 0;
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
    return User;
}());
exports.User = User;
exports.users = {
    "joao@gmail.com": new User('joao@gmail.com', 'João', 'joao123'),
    "maria@gmail.com": new User('maria@gmail.com', 'Maria', 'maria123')
};
