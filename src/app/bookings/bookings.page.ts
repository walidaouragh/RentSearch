import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { IBooking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    constructor(private bookingService: BookingService, private router: Router) {}

    bookings: IBooking[];

    ngOnInit() {
        this.getBookings();
    }

    getBookings() {
        this.bookings = this.bookingService.getBookings();
    }

    onDeleteBooking(bookingId: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.bookingService.deleteBooking(bookingId);
        this.router.navigateByUrl('/bookings');
    }
}
