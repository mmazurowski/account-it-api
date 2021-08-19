export interface PasswordCheckerService {
  verify(plain: string, password: string): Promise<boolean>;
}
