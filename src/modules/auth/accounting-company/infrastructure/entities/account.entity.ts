import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { StatusValues } from '@modules/auth/accounting-company/core/value-objects/status/status.value-object';
import { AccountTypeValues } from '@modules/auth/accounting-company/core/account-type.enum';

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

  @Column({
    type: 'enum',
    enum: StatusValues,
    default: StatusValues.AWAITING_CONFIRMATION,
    nullable: false,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: AccountTypeValues,
    default: AccountTypeValues.SERVICE_PROVIDER,
    nullable: false,
  })
  type: string;
}
