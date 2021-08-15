export abstract class DomainEvent {
  public abstract readonly key: string;

  public readonly timestamp = new Date().toISOString();

  public abstract toMessageBroker(): string;
}
