import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPlace } from '../../places/place.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    constructor(public modalController: ModalController, private fb: FormBuilder) {}

    @Input() selectedPlace: IPlace;
    @Input() selectedMode: string;
    selectedGuest = '2';
    form: FormGroup;

    ngOnInit() {
        this.createForm();
    }

    close() {
        this.modalController.dismiss(null, 'cancel');
    }

    onBook() {
        if (!this.form.valid) {
            return;
        }

        this.modalController.dismiss({ bookingData: this.form.value }, 'confirm');
    }

    createForm() {
        // generate random dates
        const dateFrom = new Date(this.selectedPlace.dateFrom);
        const dateTo = new Date(this.selectedPlace.dateTo);
        // deduct one week
        const startDate = new Date(
            dateFrom.getTime() + Math.random() * (dateTo.getTime() - 7 * 24 * 60 * 60 * 1000 - dateFrom.getTime())
        ).toISOString();
        const endDate = new Date(
            new Date(startDate).getTime() +
                Math.random() * (new Date(dateFrom).getTime() + 6 * 24 * 60 * 60 * 1000) -
                new Date(startDate).getTime()
        ).toISOString();
        if (this.selectedMode === 'select') {
            this.form = this.fb.group({
                firstName: [null, Validators.required],
                lastName: [null, Validators.required],
                guestNumber: [this.selectedGuest, [Validators.required, Validators.min(1)]],
                dateFrom: [this.selectedPlace.dateFrom.toISOString(), Validators.required],
                dateTo: [this.selectedPlace.dateTo.toISOString(), Validators.required],
            });
        } else {
            // for random dates
            this.form = this.fb.group({
                firstName: [null, Validators.required],
                lastName: [null, Validators.required],
                guestNumber: [this.selectedGuest, [Validators.required, Validators.min(1)]],
                dateFrom: [startDate, Validators.required],
                dateTo: [endDate, Validators.required],
            });
        }
    }

    dateValid() {
        const startDate = this.formControl.dateFrom.value;
        const endDate = this.formControl.dateTo.value;

        return endDate > startDate;
    }

    get formControl() {
        return this.form.controls;
    }
}
