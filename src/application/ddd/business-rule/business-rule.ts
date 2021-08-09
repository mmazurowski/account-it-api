export abstract class BusinessRule {
  public abstract message: string;

  public abstract isSatisfied(): Promise<boolean>;
}
