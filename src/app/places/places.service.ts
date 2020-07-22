import { Injectable } from '@angular/core';
import { IPlace } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    constructor(private authService: AuthService) {}

    date = new Date();

    private places: BehaviorSubject<IPlace[]> = new BehaviorSubject<IPlace[]>([
        {
            placeId: '1',
            imageUrl:
                'https://blog1.fkimg.com/wp-content/uploads/2017/03/San-Diego-California-Friends-Summer-Beach-House.jpg',
            title: 'Chicago',
            description:
                'Labore adipisicing reprehenderit tempor culpa quis consectetur minim. Aute velit est cillum laboris quis.',
            price: 149.99,
            dateFrom: new Date(),
            dateTo: new Date(this.date.setMonth(this.date.getMonth() + 1)),
            userId: '1',
        },
        {
            placeId: '2',
            imageUrl:
                'https://images.ctfassets.net/gxwgulxyxxy1/20F00dQxtvge9ot15cyp48/d7535f25060b49a5fbe5d6bd957231c6/IG3_-_State-of-the-art_home_theater_in_a_luxury_log_cabin_rental.jpg?fm=jpg&fl=progressive&w=680',
            title: 'Paris',
            description: 'Ut esse quis cillum aliquip reprehenderit aliqua dolore aliquip in labore veniam.',
            price: 199.99,
            dateFrom: new Date(),
            dateTo: new Date(this.date.setMonth(this.date.getMonth() + 1)),
            userId: '2',
        },
        {
            placeId: '3',
            imageUrl:
                'https://renthomein.files.wordpress.com/2010/06/65161428_1-pictures-of-ludhiana-real-estate-agents-realtors-property-dealers-nri-houses-india-buy-sell-rent-home.jpg',
            title: 'London',
            description: 'Eiusmod tempor nulla sunt velit do deserunt nulla. Tempor aute commodo proident nulla.',
            price: 125.99,
            dateFrom: new Date(),
            dateTo: new Date(this.date.setMonth(this.date.getMonth() + 1)),
            userId: '3',
        },
    ]);

    getPlaces() {
        return this.places.asObservable();
    }

    getPlace(placeId: string) {
        return this.places.pipe(
            take(1),
            map((places) => {
                return { ...places.find((p) => p.placeId === placeId) };
            })
        );
    }

    addPlace(place: IPlace) {
        place.placeId = Math.random().toString();
        place.imageUrl = './assets/house.jpg';
        place.userId = this.authService.UserId;
        place.dateFrom = new Date();
        place.dateTo = new Date();

        return this.places.pipe(
            take(1),
            delay(1000),
            tap((places: IPlace[]) => {
                this.places.next(places.concat(place));
            })
        );
    }

    updatePlace(placeId: string, place: IPlace) {
        return this.places.pipe(
            take(1),
            delay(1000),
            tap((places: IPlace[]) => {
                const updatedPlaceIndex = places.findIndex((pl) => pl.placeId === placeId);

                const updatedPlaces = [...places];

                updatedPlaces[updatedPlaceIndex].placeId = placeId;
                updatedPlaces[updatedPlaceIndex].title = place.title;
                updatedPlaces[updatedPlaceIndex].description = place.description;
                updatedPlaces[updatedPlaceIndex].price = place.price;
                updatedPlaces[updatedPlaceIndex].dateFrom = place.dateFrom;
                updatedPlaces[updatedPlaceIndex].dateTo = place.dateTo;

                this.places.next(updatedPlaces);
            })
        );
    }
}
