import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { IPlace } from '../place.model';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    constructor(private placesService: PlacesService) {}

    places: IPlace[];

    ngOnInit() {
        this.getPlaces();
    }

    getPlaces() {
        this.places = this.placesService.getPlaces();
    }

    segmentChanged(e: any) {
        console.log(e.detail.value);
    }
}
