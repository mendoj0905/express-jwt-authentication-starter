import * as core from '@angular/core';
import * as moment from 'moment';

@core.Injectable()
export class AuthService {

    private TOKEN_JWT = 'token';
    private EXPIRES_IN = 'expires';


    constructor() {}

    setLocalStorage(responseObj) {
        const expires = moment().add(responseObj.expiresIn);

        localStorage.setItem(this.TOKEN_JWT, responseObj.token);
        localStorage.setItem(this.EXPIRES_IN, JSON.stringify(expires.valueOf()));
    }

    logout() {
        localStorage.removeItem(this.TOKEN_JWT);
        localStorage.removeItem(this.EXPIRES_IN);
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem(this.EXPIRES_IN);
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
