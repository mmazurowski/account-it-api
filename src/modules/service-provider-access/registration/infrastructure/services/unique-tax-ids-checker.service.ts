import { UniqueTaxIdsCheckerService } from '@modules/service-provider-access/registration/core/services/unique-tax-ids-checker.service';
import { getConnection } from 'typeorm';

// TODO: implement logic here

export class UniqueTaxIdsCheckerServiceImpl implements UniqueTaxIdsCheckerService {
  public async isTaxIDUnique(id: string): Promise<boolean> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('tax_id')
      .from('service_provider', 'sp')
      .where('sp.vat_id=:id', { id })
      .getCount();

    return count === 0;
  }

  public async isUniqueRegonID(id: number): Promise<boolean> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('tax_id')
      .from('service_provider', 'sp')
      .where('sp.regon=:id', { id })
      .getCount();

    return count === 0;
  }
}
