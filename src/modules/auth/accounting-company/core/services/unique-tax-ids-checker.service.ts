export interface UniqueTaxIdsCheckerService {
  isTaxIDUnique(id: string): Promise<boolean>;
  isUniqueRegonID(id: number): Promise<boolean>;
}
