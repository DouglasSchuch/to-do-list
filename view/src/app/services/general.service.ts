import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  user: User | null = null;

  constructor() { }

  getUser(): User | null {
    if (this.user) {
      return new User(this.user.email || '', this.user.password || '', this.user.id)
    }
    return null;
  }

  //#region cookie
  removeCookie(cookie: string): void {
    document.cookie = `${cookie}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  setCookie(name: string, value: string, days = 9999999): void {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
  //#endregion cookie
}