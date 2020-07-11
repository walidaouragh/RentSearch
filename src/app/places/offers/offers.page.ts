import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlace } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
    constructor(private placesService: PlacesService, private router: Router) {}

    @ViewChild('slidingItem') slidingItem: IonItemSliding;

    offers: IPlace[];

    ngOnInit() {
        this.getOffers();
    }

    getOffers() {
        this.offers = this.placesService.getPlaces();
    }

    onEdit(placeId: string) {
        this.slidingItem.close();
        this.router.navigateByUrl(`/places/offers/${placeId}`);
    }
}
