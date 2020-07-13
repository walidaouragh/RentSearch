import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { IPlace } from '../../place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    constructor(
        private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    offer: IPlace;
    form: FormGroup;
    dateFrom: string;
    dateTo: string;

    ngOnInit() {
        const placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getOffer(placeId);
    }

    getOffer(placeId: string) {
        this.offer = this.placesService.getPlace(placeId);
        this.dateFrom = new Date().toISOString();
        this.dateTo = new Date().toISOString();
        this.createForm();
    }

    getDate() {
        return new Date();
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
    }
}
