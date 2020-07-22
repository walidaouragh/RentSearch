import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlace } from '../../place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    constructor(
        private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        public loadingController: LoadingController
    ) {}

    offer: IPlace;
    form: FormGroup;
    dateFrom: string;
    dateTo: string;
    isLoading = false;
    private placesSub: Subscription;

    ngOnInit() {
        const placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getOffer(placeId);
    }

    getOffer(placeId: string) {
        this.isLoading = true;
        this.placesSub = this.placesService.getPlace(placeId).subscribe((place: IPlace) => {
            this.offer = place;
            this.isLoading = false;
        });
        this.dateFrom = new Date().toISOString();
        this.dateTo = new Date().toISOString();
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            title: [this.offer.title, Validators.required],
            description: [this.offer.description, [Validators.required, Validators.maxLength(180)]],
            price: [this.offer.price, [Validators.required, Validators.min(1)]],
            dateFrom: [this.dateFrom, Validators.required],
            dateTo: [this.dateTo, Validators.required],
        });
    }

    get formControl() {
        return this.form.controls;
    }

    onEditOffer() {
        if (!this.form.valid) {
            return;
        }

        this.loadingController
            .create({
                keyboardClose: true,
                message: 'Updating place...',
            })
            .then((loadingElem) => {
                loadingElem.present();
                this.placesService.updatePlace(this.offer.placeId, this.form.value).subscribe(() => {
                    loadingElem.dismiss();
                    this.form.reset();
                    this.router.navigateByUrl('/places/offers');
                });
            });
    }

    ngOnDestroy(): void {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
