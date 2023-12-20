import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { CountryI } from '../models/country.model';

@Component({
  selector: 'ion-intl-tel-code',
  templateUrl: './ion-intl-tel-code.component.html'
})

export class IonIntTelCodeComponent implements OnInit {

  @Input() country: CountryI;
  @Input() canSearch: boolean;
  @Input() closeButtonText = 'Close';
  @Input() closeButtonSlot = 'end';
  @Input() countries: CountryI[];
  @Input() searchFailText: string;
  @Input() searchPlaceholder: string;
  @Input() shouldFocusSearchbar: boolean;
  @Input() title: string;
  @Input() dialCode: string;

  @ViewChild('searchBar') sbar: IonSearchbar;

  private allCountries: CountryI[];

  public notFound;

  constructor(
      private modalCtrl: ModalController
  ) {

  }

  ngOnInit(): void {
    this.allCountries = this.countries;
  }

  ionViewDidEnter() {
    if (this.sbar && this.shouldFocusSearchbar) {
      setTimeout( () => { this.sbar.setFocus(); }, 400);
    }
  }

  search(ev) {
    let search = ev.detail.value;
    this.notFound = false;
    if (search === '' || search === null) {
      this.countries = this.allCountries;
    } else {
      search = search.toLocaleLowerCase();
      this.countries = this.allCountries.filter( r => {
        return (r.name && r.name.toLocaleLowerCase().indexOf(search) !== -1);
      });
      if (this.countries.length === 0) {
        this.notFound = true;
      }
    }
  }

  itemTapped(c) {
    this.modalCtrl.dismiss(c);
  }

  closeModal() {
    this.modalCtrl.dismiss(null);
  }

}
