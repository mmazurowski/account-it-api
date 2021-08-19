export interface PasswordService {
  hashPassword(password: string): Promise<string>;
  getPasswordStrength(password: string): number;
}
