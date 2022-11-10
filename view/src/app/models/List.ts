import { Task } from "./Task";
import { User } from "./User";

export class List {
    id: number | null = null;
    name: string;
    user: User | null = null;
    tasks: Task[] = [];

    constructor(name: string, user: User, id: number | null = null) {
        this.id = id;
        this.name = name;
        this.user = user;
    }
}