import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        public loadingController: LoadingController,
        private fb: FormBuilder
    ) {}

    isLoading = false;
    loginForm: FormGroup;
    registerForm: FormGroup;
    isLogin = true;

    ngOnInit() {
        this.createLoginForm();
        this.createRegisterForm();
    }

    onLogin() {
        if (!this.loginForm.valid) {
            return;
        }

        this.authService.login();
        this.loadingController
            .create({
                keyboardClose: true,
                message: 'Please wait...',
            })
            .then((loadingElem) => {
                loadingElem.present();
                setTimeout(() => {
                    loadingElem.dismiss();
                    this.router.navigateByUrl('/places/discover');
                }, 2000);
            });
    }

    onRegister() {
        if (!this.registerForm.valid) {
            return;
        }
        this.authService.login();
        this.loadingController
            .create({
                keyboardClose: true,
                message: 'Please wait...',
            })
            .then((loadingElem) => {
                loadingElem.present();
                setTimeout(() => {
                    loadingElem.dismiss();
                    this.router.navigateByUrl('/places/discover');
                }, 2000);
            });
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get loginFormControl() {
        return this.loginForm.controls;
    }

    get registerFormControl() {
        return this.registerForm.controls;
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }
}
