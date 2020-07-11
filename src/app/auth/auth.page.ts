import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        public loadingController: LoadingController
    ) {}

    isLoading = false;

    ngOnInit() {}

    onLogin() {
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
}
