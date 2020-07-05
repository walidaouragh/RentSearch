import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPlace } from '../../places/place.model';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    constructor(public modalController: ModalController) {}

    @Input() selectedPlace: IPlace;

    ngOnInit() {}

    close() {
        this.modalController.dismiss(null, 'cancel');
    }

    onBook() {
        this.modalController.dismiss({ message: 'More to come!' }, 'confirm');
    }
}
