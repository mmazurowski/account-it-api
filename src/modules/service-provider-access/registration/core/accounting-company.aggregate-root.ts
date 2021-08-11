import { AggregateRoot } from '@application/ddd/aggregate/aggregate-root';
import { TaxIdMustBeUniqueRule } from '@modules/service-provider-access/registration/core/rules/tax-id-must-be-unique.rule';
import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';
import { RegonMustBeUniqueRule } from '@modules/service-provider-access/registration/core/rules/regon-must-be-unique.rule';
import { RegonValueObject } from '@modules/service-provider-access/registration/core/value-objects/regon/regon.value-object';
import { VatIdValueObject } from '@modules/service-provider-access/registration/core/value-objects/vat-id/vat-id.value-object';
import { PostalCodeValueObject } from '@modules/service-provider-access/registration/core/value-objects/postal-code/postal-code.value-object';
import { PasswordService } from '@modules/service-provider-access/registration/core/services/password.service';
import { PasswordMustBeStrongRule } from '@modules/service-provider-access/registration/core/rules/password-must-be-strong.rule';
import { PhoneNumberValueObject } from '@modules/service-provider-access/registration/core/value-objects/phone-number/phone-number.value-object';
import { StatusValueObject } from '@modules/service-provider-access/registration/core/value-objects/status/status.value-object';
import { EmailMustBeUniqueRule } from '@modules/service-provider-access/registration/core/rules/email-must-be-unique.rule';
import { UniqueEmailCheckerService } from '@modules/service-provider-access/registration/core/services/unique-email-checker.service';
import { ServiceProviderRegisteredEvent } from '@modules/service-provider-access/registration/core/events/service-provider-registered.event';

interface AccountingCompanyAggregateRootState {
  businessName: string;
  address: string;
  email: string;
  password: string;
  city: string;
  regon: RegonValueObject;
  vatID: VatIdValueObject;
  postalCode: PostalCodeValueObject;
  phoneNumber: PhoneNumberValueObject;
  status: StatusValueObject;
  registeredAt: Date;
}

interface AccountingCompanyAggregateRootJSON {
  id: string;
  businessName: string;
  email: string;
  password: string;
  vatID: string;
  regon: number;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
  registeredAt: Date;
  status: string;
}

export interface RegisterAsServiceProviderProps {
  businessName: string;
  vatID: string;
  email: string;
  password: string;
  regon: number;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

export class AccountingCompanyAggregateRoot extends AggregateRoot<
  AccountingCompanyAggregateRootState
> {
  private constructor(props: AccountingCompanyAggregateRootState, id?: string) {
    super(props, id);
  }

  public static async registerAsServiceProvider(
    props: RegisterAsServiceProviderProps,
    uniqueTaxIdsCheckerService: UniqueTaxIdsCheckerService,
    passwordService: PasswordService,
    uniqueEmailCheckerService: UniqueEmailCheckerService,
  ) {
    const { vatID, regon, email, postalCode, password, phoneNumber, ...rest } = props;

    await AccountingCompanyAggregateRoot.checkBusinessRule(
      new TaxIdMustBeUniqueRule(vatID, uniqueTaxIdsCheckerService),
    );

    await AccountingCompanyAggregateRoot.checkBusinessRule(
      new RegonMustBeUniqueRule(regon, uniqueTaxIdsCheckerService),
    );

    await AccountingCompanyAggregateRoot.checkBusinessRule(
      new EmailMustBeUniqueRule(email, uniqueEmailCheckerService),
    );

    await AccountingCompanyAggregateRoot.checkBusinessRule(
      new PasswordMustBeStrongRule(password, passwordService),
    );

    const company = new AccountingCompanyAggregateRoot({
      ...rest,
      email,
      password: await passwordService.hashPassword(password),
      regon: await RegonValueObject.fromValue(regon),
      vatID: await VatIdValueObject.fromValue(vatID),
      postalCode: await PostalCodeValueObject.fromValue(postalCode),
      phoneNumber: await PhoneNumberValueObject.fromValue(phoneNumber),
      status: StatusValueObject.AWAITING_CONFIRMATION,
      registeredAt: new Date(),
    });

    company.addDomainEvent(new ServiceProviderRegisteredEvent(email, company.id.toString()));

    return company;
  }

  toJSON(): AccountingCompanyAggregateRootJSON {
    return {
      id: this.id.toString(),
      city: this.state.city,
      password: this.state.password,
      businessName: this.state.businessName,
      vatID: this.state.vatID.getValue(),
      regon: this.state.regon.getValue(),
      address: this.state.address,
      postalCode: this.state.postalCode.getValue(),
      phoneNumber: this.state.phoneNumber.getValue(),
      registeredAt: this.state.registeredAt,
      status: this.state.status.getValue(),
      email: this.state.email,
    };
  }
}
