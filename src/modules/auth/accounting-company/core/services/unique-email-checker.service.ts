export interface UniqueEmailCheckerService {
  isEmailUnique(email: string): Promise<boolean>;
}
