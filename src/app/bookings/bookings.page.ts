import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { IBooking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    constructor(
        private bookingService: BookingService,
        private router: Router,
        private loadingCtr: LoadingController
    ) {}

    bookings: IBooking[];

    ngOnInit() {
        this.getBookings();
    }

    getBookings() {
        this.bookingService.getBookings().subscribe((bookings: IBooking[]) => {
            this.bookings = bookings;
        });
    }

    onDeleteBooking(bookingId: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.loadingCtr
            .create({
                keyboardClose: true,
                message: 'Deleting wait...',
            })
            .then((loadingElem) => {
                loadingElem.present();
                this.bookingService.deleteBooking(bookingId).subscribe(() => {
                    loadingElem.dismiss();
                    this.getBookings();
                    this.router.navigateByUrl('/bookings');
                });
            });
    }
}
