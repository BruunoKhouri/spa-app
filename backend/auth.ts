import { Request, Response } from 'express';
import { User, users } from './users';


import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';
// var obj = require('../db.json');

export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body;
    if (isValid(user)) {
        // const dbUser = obj.users[user.email]
        const dbUser = users[user.email];
        const token = jwt.sign({ sub: dbUser.email, iss: 'api' }, apiConfig.secret);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    } else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
}

export const handleCreation = (req: Request, resp: Response) => {
    // const user: User = req.body;
    const user = new User(req.body.email, req.body.name, req.body.password);
    if (true) {
        const newUser: { [key: string]: User } = {
            [`${user.email}`]: new User(user.email, user.name, user.password)
        }
        user.addUser(newUser);
        resp.json({ name: newUser.name, email: newUser.email });
        resp.status(500).json({ newUser, users });
    } else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
}

export const handleGet = (req: Request, resp: Response) => {
    resp.json({ users: users });
}

function isValid(user: User): boolean {
    if (!user) {
        return false;
    }
    const dbUser = users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}