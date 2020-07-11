import { Injectable } from '@angular/core';
import { IBooking } from './booking.model';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    constructor() {}
    private bookings: IBooking[] = [
        {
            bookingId: '1',
            placeId: '1',
            userId: '1',
            placeTitle: 'Chicago',
            guestNumber: 1,
        },
    ];

    getBookings() {
        return [...this.bookings];
    }

    deleteBooking(bookingId: string) {
        this.bookings = this.bookings.filter((b) => {
            return b.bookingId !== bookingId;
        });
    }
}
