import { Command } from '@lunar-flight-v/command-module';

interface Payload {
  email: string;
  businessName: string;
  vatID: string;
  password: string;
  regon: number;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

export const REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND = 'service-provider-access/registration';

export class RegisterCompanyAsServiceProviderCommand extends Command<Payload> {
  key = REGISTER_COMPANY_AS_SERVICE_PROVIDER_COMMAND;
}
