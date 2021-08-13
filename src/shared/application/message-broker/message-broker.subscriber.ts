export type MessageBrokerHandler<T> = (message: T) => Promise<unknown>;

export abstract class MessageBrokerSubscriber<T, K> {
  public abstract key: string;

  constructor(protected readonly dependencies: T) {}

  public abstract subscribe(message: K): Promise<unknown>;
}
