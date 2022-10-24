import * as db from '../db.json'
export class User {
    constructor(
        public email: string,
        public name: string,
        public password: string,
        public id: number
    ) { }
}

export let users: any = db.users;

