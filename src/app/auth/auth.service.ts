import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    private isAuthenticated = false;
    private userId = '1';

    get IsUserIsAuthenticated() {
        return this.isAuthenticated;
    }

    get UserId() {
        return this.userId;
    }

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }
}
