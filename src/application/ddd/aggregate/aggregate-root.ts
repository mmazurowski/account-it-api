import { Entity } from '@application/ddd/entity/entity';

export abstract class AggregateRoot<T> extends Entity<T> {}
