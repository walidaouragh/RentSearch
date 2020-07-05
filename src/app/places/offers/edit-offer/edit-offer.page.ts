import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { IPlace } from '../../place.model';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    constructor(private placesService: PlacesService, private activatedRoute: ActivatedRoute) {}

    place: IPlace;

    ngOnInit() {
        let placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getOffer(placeId);
    }

    getOffer(placeId: string) {
        this.place = this.placesService.getPlace(placeId);
    }
}
