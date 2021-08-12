export interface PasswordService {
  hashPassword(password: string): Promise<string>;
  verify(plain: string, hash: string): Promise<boolean>;
  getPasswordStrength(password: string): number;
}
