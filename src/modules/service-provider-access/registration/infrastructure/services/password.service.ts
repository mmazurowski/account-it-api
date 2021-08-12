import { PasswordService } from '@modules/service-provider-access/registration/core/services/password.service';
import { PasswordMeter } from 'password-meter';
import { hash, verify } from 'argon2';

export class PasswordServiceImpl implements PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return hash(password);
  }

  public async verify(plain: string, hashedPassword: string) {
    return verify(hashedPassword, plain);
  }

  public getPasswordStrength(password: string): number {
    const { score } = new PasswordMeter().getResult(password);

    return score;
  }
}
