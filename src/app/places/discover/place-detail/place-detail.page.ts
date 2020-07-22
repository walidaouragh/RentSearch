import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { IPlace } from '../../place.model';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from '../../../bookings/booking.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    constructor(
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        public modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private bookingService: BookingService,
        private router: Router,
        private loadingCtr: LoadingController
    ) {}

    place: IPlace;
    isLoading = false;
    private placesSub: Subscription;

    ngOnInit() {
        const placeId: string = this.activatedRoute.snapshot.paramMap.get('placeId');
        this.getPlaceDetail(placeId);
    }

    getPlaceDetail(placeId: string) {
        this.isLoading = true;
        this.placesSub = this.placesService.getPlace(placeId).subscribe((place: IPlace) => {
            this.place = place;
            this.isLoading = false;
        });
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
                    this.loadingCtr
                        .create({
                            keyboardClose: true,
                            message: 'Booking wait...',
                        })
                        .then((loadingElem) => {
                            loadingElem.present();
                            this.bookingService
                                .addBooking(
                                    this.place.placeId,
                                    this.place.userId,
                                    this.place.title,
                                    this.place.imageUrl,
                                    res.data.bookingData.firstName,
                                    res.data.bookingData.lastName,
                                    res.data.bookingData.guestNumber,
                                    res.data.bookingData.dateFrom,
                                    res.data.bookingData.dateTo
                                )
                                .subscribe(() => {
                                    loadingElem.dismiss();
                                    this.router.navigateByUrl('/bookings');
                                });
                        });
                }
            });
    }

    ngOnDestroy(): void {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
