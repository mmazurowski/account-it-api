export abstract class DomainEvent {
  public abstract readonly eventKey: string;

  public readonly timestamp = new Date().toISOString();
}
