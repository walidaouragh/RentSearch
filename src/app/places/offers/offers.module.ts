import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { PlacesPageModule } from '../places.module';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, OffersPageRoutingModule, PlacesPageModule, ReactiveFormsModule],
    declarations: [OffersPage],
})
export class OffersPageModule {}
