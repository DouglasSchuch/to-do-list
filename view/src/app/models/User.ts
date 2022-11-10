import { List } from "./List";

export class User {
    id: number | null = null;
    email: string | null = null;
    password: string | null = null;
    lists: List[] = [];

    constructor(email: string, password: string, id: number | null = null){
        this.id = id;
        this.email = email;
        this.password = password;
    }
}

export class Login {
    email: string | null = null;
    password: string | null = null;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}