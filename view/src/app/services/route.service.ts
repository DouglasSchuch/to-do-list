import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User } from '../models/User';
import { List } from '../models/List';
import { Task } from '../models/Task';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    port: number = (3000);
    host: string;
    constructor(public http: HttpClient, private general: GeneralService) {
        this.host = `${location.protocol}//${location.hostname}:${this.port}/`;
    }

    getHeaders() {
        return { Authorization: `Bearer ${this.general.getCookie('TOKEN') || ''}` }
    }

    //#region User/Auth
    login(data: Login): any {
        return this.http.post(`${this.host}auth/login`, data, { headers: this.getHeaders() });
    }

    getUserBoard(): any {
        return this.http.get(`${this.host}auth/board`, { headers: this.getHeaders() });
    }

    createUser(data: User): any {
        return this.http.post(`${this.host}users`, data, { headers: this.getHeaders() });
    }

    getUserById(id: number): any {
        return this.http.get(`${this.host}users/${id}`, { headers: this.getHeaders() });
    }
    //#endregion User/Auth

    //#region List
    createList(data: List): any {
        return this.http.post(`${this.host}lists`, data, { headers: this.getHeaders() });
    }

    removeList(id: number): any {
        return this.http.delete(`${this.host}lists/${id}`, { headers: this.getHeaders() });
    }
    //#endregion List
    
    //#region Task
    createTask(data: Task): any {
        return this.http.post(`${this.host}tasks`, data, { headers: this.getHeaders() });
    }

    removeTask(id: number): any {
        return this.http.delete(`${this.host}tasks/${id}`, { headers: this.getHeaders() });
    }
    //#endregion Task
}