import { createMockProxy } from '@tools/create-mock-proxy';
import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';
import {
  AccountingCompanyAggregateRoot,
  RegisterAsServiceProviderProps,
} from '@modules/service-provider-access/registration/core/accounting-company.aggregate-root';
import { PasswordService } from '@modules/service-provider-access/registration/core/services/password.service';
import { UniqueEmailCheckerService } from '@modules/service-provider-access/registration/core/services/unique-email-checker.service';
import { ServiceProviderRegisteredEvent } from '@modules/service-provider-access/registration/core/events/service-provider-registered.event';

describe('[MODULE - ServiceProviderAccess/Registration] AccountingCompany', () => {
  const uniqueTaxIdsChecker = createMockProxy<UniqueTaxIdsCheckerService>();
  const passwordService = createMockProxy<PasswordService>();
  const uniqueEmailCheckerService = createMockProxy<UniqueEmailCheckerService>();

  const aggregateProps: RegisterAsServiceProviderProps = {
    email: 'hello@email.com',
    businessName: 'Apple',
    vatID: 'PL0123456789',
    password: 'someVeryStrongPassword!123',
    regon: 123456789,
    address: 'Sezame Street 16/4',
    postalCode: '30-123',
    city: 'Gdańsk',
    phoneNumber: '+48 222 333 444',
  };

  beforeEach(() => {
    uniqueTaxIdsChecker.mockClear();
    passwordService.mockClear();
    uniqueEmailCheckerService.mockClear();
  });

  test('should throw an error when password is not strong', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValue(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValue(true);
    passwordService.getPasswordStrength.mockReturnValue(10);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(true);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        aggregateProps,
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError(
      'Password must have minimum 8 characters and contain at least one uppercase, lowercase char and one special symbol',
    );
  });

  test('should throw an error when tax id is not unique', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValue(false);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        aggregateProps,
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('Company with provided Tax ID already exists');
  });

  test('should throw an error when REGON is not unique', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(false);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        aggregateProps,
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('Company with provided REGON already exists');
  });

  test('should throw an error when REGON is not integer', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(true);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(true);

    passwordService.getPasswordStrength.mockReturnValue(100);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        { ...aggregateProps, ...{ regon: 123.23 } },
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('REGON must be integer number');
  });

  test('should throw an error when REGON is not 9 digits', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(true);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(true);

    passwordService.getPasswordStrength.mockReturnValue(100);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        { ...aggregateProps, ...{ regon: 12345678 } },
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('REGON must be have nine digits');
  });

  test('should throw an error when postal code has wrong format', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(true);
    passwordService.getPasswordStrength.mockReturnValue(100);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(true);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        { ...aggregateProps, postalCode: '112223' },
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('Must be in the following format: in XX-XXX');
  });

  test('should throw an error when email is not unique', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(true);
    passwordService.getPasswordStrength.mockReturnValue(100);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(false);

    await expect(() =>
      AccountingCompanyAggregateRoot.registerAsServiceProvider(
        aggregateProps,
        uniqueTaxIdsChecker,
        passwordService,
        uniqueEmailCheckerService,
      ),
    ).rejects.toThrowError('Provided email is already taken');
  });

  test('should create aggregate', async () => {
    uniqueTaxIdsChecker.isTaxIDUnique.mockResolvedValueOnce(true);
    uniqueTaxIdsChecker.isUniqueRegonID.mockResolvedValueOnce(true);
    passwordService.getPasswordStrength.mockReturnValue(100);
    uniqueEmailCheckerService.isEmailUnique.mockResolvedValueOnce(true);

    const instance = await AccountingCompanyAggregateRoot.registerAsServiceProvider(
      aggregateProps,
      uniqueTaxIdsChecker,
      passwordService,
      uniqueEmailCheckerService,
    );

    expect(instance).toBeInstanceOf(AccountingCompanyAggregateRoot);
    expect(instance.getDomainEvents()).toHaveLength(1);
    expect(instance.getDomainEvents()[0]).toBeInstanceOf(ServiceProviderRegisteredEvent);
  });
});
