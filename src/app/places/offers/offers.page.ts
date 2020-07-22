import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPlace } from '../place.model';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
    constructor(private placesService: PlacesService, private router: Router) {}

    @ViewChild('slidingItem') slidingItem: IonItemSliding;

    offers: IPlace[];
    isLoading = false;
    private placesSub: Subscription;

    ngOnInit() {
        this.getOffers();
    }

    getOffers() {
        this.isLoading = true;
        this.placesSub = this.placesService.getPlaces().subscribe((offers: IPlace[]) => {
            this.offers = offers;
            this.isLoading = false;
        });
    }

    onEdit(place: IPlace) {
        this.slidingItem.close();
        this.router.navigateByUrl(`/places/offers/${place.placeId}`);
    }

    ngOnDestroy(): void {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
