import { getConnection } from 'typeorm';
import { UniqueEmailCheckerService } from '@modules/service-provider-access/registration/core/services/unique-email-checker.service';

export class UniqueEmailCheckerServiceImpl implements UniqueEmailCheckerService {
  public async isEmailUnique(email: string): Promise<boolean> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('email')
      .from('account', 'ac')
      .where('ac.email=:email', { email })
      .getCount();

    return count === 0;
  }
}
