import { Injectable } from '@angular/core';
import { IBooking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    constructor(private authService: AuthService) {}
    private bookings: BehaviorSubject<IBooking[]> = new BehaviorSubject<IBooking[]>([]);

    getBookings() {
        return this.bookings.asObservable();
    }

    addBooking(
        placeId: string,
        userId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastname: string,
        guestNumber: number,
        bookedFrom: Date,
        bookedTo: Date
    ) {
        const booking = new IBooking(
            Math.random().toString(),
            this.authService.UserId,
            placeTitle,
            placeImage,
            firstName,
            lastname,
            guestNumber,
            bookedFrom,
            bookedTo
        );

        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap((bookings) => {
                this.bookings.next(bookings.concat(booking));
            })
        );
    }

    deleteBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap((bookings: IBooking[]) => {
                this.bookings.next(bookings.filter((b) => b.placeId !== bookingId));
            })
        );
    }
}
