import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) { // Extra verification, done in page but it can be manually bypassed using developer tools.
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authOb: Observable<AuthResponseData>;
        this.isLoading = true;

        if (this.isLoginMode) {
            authOb = this.authService.login(email, password);
        } else {
            authOb = this.authService.signup(email, password);
        }

        authOb.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
        }, errorMsg => {
            console.log(errorMsg);
            this.error = errorMsg;
            this.isLoading = false;
        });

        form.reset();
    }
}