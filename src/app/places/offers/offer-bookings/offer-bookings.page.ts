import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
    constructor(
        private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    offer: IPlace;
    form: FormGroup;

    ngOnInit() {
        const placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getOffer(placeId);
    }

    getOffer(placeId: string) {
        this.offer = this.placesService.getPlace(placeId);
        this.createForm();
    }

    getDate() {
        return new Date();
    }

    createForm() {
        this.form = this.fb.group({
            title: [this.offer.title],
            description: [this.offer.description],
            price: [this.offer.price],
            dateFrom: [this.offer.dateFrom.toISOString()],
            dateTo: [this.offer.dateTo.toISOString()],
        });
    }
}
