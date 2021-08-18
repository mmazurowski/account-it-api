import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { StatusValues } from '@modules/service-provider-access/registration/core/value-objects/status/status.value-object';

export interface AccountDbEntityProps {
  id: string;
  email: string;
  password: string;
  registered_at: Date;
  status: string;
}

@Entity('account')
export class AccountEntity extends BaseEntity implements AccountDbEntityProps {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'timestamptz', nullable: false })
  registered_at: Date;

  @Column({ type: 'enum', enum: StatusValues, default: StatusValues.AWAITING_CONFIRMATION })
  status: string;
}
