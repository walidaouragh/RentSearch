import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
    constructor(
        private placesService: PlacesService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    offer: IPlace;
    form: FormGroup;
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
            this.createForm();
        });
    }

    getDate() {
        return new Date();
    }

    createForm() {
        if (this.offer) {
            this.form = this.fb.group({
                title: [this.offer.title],
                description: [this.offer.description],
                price: [this.offer.price],
                dateFrom: [this.offer.dateFrom.toISOString()],
                dateTo: [this.offer.dateTo.toISOString()],
            });
        }
    }

    ngOnDestroy(): void {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
