import { PasswordCheckerService } from '@modules/auth/account/core/services/password-checker.service';
import { verify } from 'argon2';

export class PasswordCheckerServiceImpl implements PasswordCheckerService {
  public async verify(plain: string, password: string): Promise<boolean> {
    return verify(password, plain);
  }
}
