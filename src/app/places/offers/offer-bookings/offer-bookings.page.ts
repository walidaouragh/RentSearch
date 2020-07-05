import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
    constructor(private placesService: PlacesService, private activatedRoute: ActivatedRoute) {}

    offer: IPlace;

    ngOnInit() {
        let placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getOffer(placeId);
    }

    getOffer(placeId: string) {
        this.offer = this.placesService.getPlace(placeId);
    }
}
