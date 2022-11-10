import { List } from "./List";

export class Task {
    id: number | null = null;
    description: string | null = null;
    isCompleted: boolean = false;
    list: List | null = null;

    constructor(description: string, list: List, isCompleted: boolean = false){
        this.description = description;
        this.list = list;
        this.isCompleted = isCompleted;
    }
}