import {Component, Input, OnInit} from '@angular/core';
import {IPlace} from '../../place.model';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  constructor() { }

  @Input() place: IPlace;

  ngOnInit() {}

  getDate() {
    return new Date();
  }
}
