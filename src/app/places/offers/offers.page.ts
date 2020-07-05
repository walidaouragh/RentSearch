import { Component, OnInit } from '@angular/core';
import { IPlace } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    constructor(private placesService: PlacesService) {}

    offers: IPlace[];

    ngOnInit() {
        this.getOffers();
    }

    getOffers() {
        this.offers = this.placesService.getPlaces();
    }
}
