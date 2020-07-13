import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
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
        public modalController: ModalController,
        private actionSheetController: ActionSheetController
    ) {}

    place: IPlace;

    ngOnInit() {
        const placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getPlaceDetail(placeId);
    }

    getPlaceDetail(placeId: string) {
        this.place = this.placesService.getPlace(placeId);
    }

    onBookPlace() {
        this.createOfferModal();
    }

    createOfferModal() {
        this.actionSheetController
            .create({
                header: 'Choose an action',
                buttons: [
                    {
                        text: 'Select Date',
                        handler: () => {
                            this.openBookingModel('select');
                        },
                    },
                    {
                        text: 'Random Date',
                        handler: () => {
                            this.openBookingModel('random');
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ],
            })
            .then((sheetElem) => {
                sheetElem.present();
            });
    }

    openBookingModel(mode: 'select' | 'random') {
        this.modalController
            .create({
                component: CreateBookingComponent,
                componentProps: { selectedPlace: this.place, selectedMode: mode },
            })
            .then((modalEl) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then((res) => {
                if (res.role === 'confirm') {
                    console.log('BOOKED!');
                }
            });
    }
}
