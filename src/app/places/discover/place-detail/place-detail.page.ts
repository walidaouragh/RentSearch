import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';
import { ModalController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        public modalController: ModalController
    ) {}

    place: IPlace;

    ngOnInit() {
        let placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getPlaceDetail(placeId);
    }

    getPlaceDetail(placeId: string) {
        this.place = this.placesService.getPlace(placeId);
    }

    onBookPlace() {
        this.createOfferModal();
    }

    createOfferModal() {
        this.modalController
            .create({
                component: CreateBookingComponent,
                componentProps: { selectedPlace: this.place },
            })
            .then((modalEl) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then((res) => {
                console.log(res.data, res.role);
                if (res.role === 'confirm') {
                    console.log('BOOKED!');
                }
            });
    }
}
