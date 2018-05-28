import { Inject, Injectable } from '@angular/core';
import { ADDRESS_FORM_FACTORY, AddressFormFactory } from '../components/address-form/address-form.factory';

@Injectable()
export class AddressFormFactoryProvider {
  constructor(@Inject(ADDRESS_FORM_FACTORY) private factories: AddressFormFactory[]) {}

  /*
    gets the appropriate address factory for the given countryCode
  */
  getFactory(countryCode: string = 'default'): AddressFormFactory {
    let factory = this.findFactory(countryCode);
    if (!factory) {
      factory = this.findFactory('default');
    }
    return factory;
  }

  private findFactory(countryCode: string): AddressFormFactory {
    return this.factories.find(f => f.countryCode === countryCode);
  }
}
