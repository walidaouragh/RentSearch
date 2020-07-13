import { Injectable } from '@angular/core';
import { IPlace } from './place.model';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    constructor() {}

    date = new Date();

    private places: IPlace[] = [
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
        },
    ];

    getPlaces() {
        return [...this.places];
    }

    getPlace(placeId: string) {
        return {
            ...this.places.find((p) => {
                return p.placeId === placeId;
            }),
        };
    }
}
