import { PasswordService } from '@modules/auth/accounting-company/core/services/password.service';
import { PasswordMeter } from 'password-meter';
import { hash } from 'argon2';

export class PasswordServiceImpl implements PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return hash(password);
  }

  public getPasswordStrength(password: string): number {
    const { score } = new PasswordMeter().getResult(password);

    return score;
  }
}
