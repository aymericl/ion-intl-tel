import { Pipe, PipeTransform } from '@angular/core';
import { CountryI } from '../models/country.model';
import {getExampleNumber} from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

@Pipe({ name: 'countryPlaceholder' })
export class CountryPlaceholder implements PipeTransform {
  transform(country: CountryI, inputPlaceholder: string,
            separateDialCode: boolean, fallbackPlaceholder: string,
            usePatternPlaceholder: boolean): string {
    if (inputPlaceholder && inputPlaceholder.length > 0) {
      return inputPlaceholder;
    }

    try {

      const example = getExampleNumber(country.isoCode as any, examples);
      let placeholder = example.formatInternational();

      if (usePatternPlaceholder) {
        const dc = placeholder.substring(0, placeholder.indexOf(' '));
        placeholder = placeholder.substring(placeholder.indexOf(' ') + 1);
        placeholder = dc + ' ' + placeholder.replace(/\d/g, 'x');
      }
      if (placeholder) {
        if (separateDialCode) {
          return placeholder.substring(placeholder.indexOf(' ') + 1);
        } else {
          return placeholder;
        }
      }
    } catch (e) {
      return fallbackPlaceholder;
    }
  }
}
