import * as jsonServer from 'json-server';

const router = jsonServer.router('db.json');
export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string) { }

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password
    }

    addUser(user: { [key: string]: User }) {
        users = { ...users, ...user }
    }
}

export let users: { [key: string]: User } = {
    "joao@gmail.com": new User('joao@gmail.com', 'João', 'joao123'),
    "maria@gmail.com": new User('maria@gmail.com', 'Maria', 'maria123')
}