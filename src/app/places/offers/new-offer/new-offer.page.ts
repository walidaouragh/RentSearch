import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
    constructor(
        private placesService: PlacesService,
        private router: Router,
        public loadingController: LoadingController
    ) {}

    offerForm: FormGroup;

    ngOnInit() {
        this.createOfferForm();
    }

    onCreateOffer() {
        if (!this.offerForm.valid) {
            return;
        }

        this.loadingController
            .create({
                keyboardClose: true,
                message: 'Creating place...',
            })
            .then((loadingElem) => {
                loadingElem.present();
                this.placesService.addPlace(this.offerForm.value).subscribe(() => {
                    loadingElem.dismiss();
                    this.offerForm.reset();
                    this.router.navigateByUrl('/places/offers');
                });
            });
    }

    createOfferForm() {
        this.offerForm = new FormGroup({
            title: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)],
            }),
            price: new FormControl(null, { updateOn: 'blur', validators: [Validators.required, Validators.min(1)] }),
            dateFrom: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
            dateTo: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
        });
    }

    get offerFormControl() {
        return this.offerForm.controls;
    }
}
