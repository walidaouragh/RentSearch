import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferBookingsPageRoutingModule } from './offer-bookings-routing.module';

import { OfferBookingsPage } from './offer-bookings.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, OfferBookingsPageRoutingModule, ReactiveFormsModule],
    declarations: [OfferBookingsPage],
})
export class OfferBookingsPageModule {}
