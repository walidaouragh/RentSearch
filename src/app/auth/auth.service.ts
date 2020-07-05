import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    private isAuthenticated = false;

    get IsUserIsAuthenticated() {
        return this.isAuthenticated;
    }

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }
}
