import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CountryPlaceholder } from './pipes/country-placeholder';
import { IonIntlTelInputValidatorDirective } from './ion-intl-tel-input.directive';
import { IonIntlTelInputComponent } from './ion-intl-tel-input/ion-intl-tel-input.component';
import { IonIntlTelInputService } from './ion-intl-tel-input.service';
import { IonIntTelCodeComponent } from './ion-intl-tel-input/ion-intl-tel-code.component';

@NgModule({
  declarations: [
    CountryPlaceholder,
    IonIntlTelInputValidatorDirective,
    IonIntlTelInputComponent,
    IonIntTelCodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule
  ],
  exports: [
    IonIntlTelInputComponent,
    IonIntlTelInputValidatorDirective,
    IonIntTelCodeComponent
  ],
  providers: [
    IonIntlTelInputService
  ],
})
export class IonIntlTelInputModule { }
