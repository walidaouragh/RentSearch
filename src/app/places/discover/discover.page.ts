import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { IPlace } from '../place.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    constructor(private placesService: PlacesService, private authService: AuthService) {}

    places: IPlace[];
    isLoading = false;
    private placesSub: Subscription;

    ngOnInit() {
        this.getPlaces();
    }

    getPlaces() {
        this.isLoading = true;
        this.placesSub = this.placesService.getPlaces().subscribe((places: IPlace[]) => {
            this.places = places;
            this.isLoading = false;
        });
    }

    segmentChanged(e: any) {
        if (e.detail.value === 'all') {
            this.getPlaces();
        } else {
            this.places = this.places.filter((p) => p.userId !== this.authService.UserId);
        }
    }

    ngOnDestroy(): void {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
