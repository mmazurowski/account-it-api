import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from '@modules/service-provider-access/registration/infrastructure/entities/account.entity';

@Entity('service_provider')
export class ServiceProviderEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => AccountEntity, (account) => account.id)
  @JoinColumn({ name: 'id' })
  account: AccountEntity;

  @Column({ type: 'text', nullable: false })
  business_name: string;

  @Column({ type: 'text', nullable: false })
  vat_id: string;

  @Column({ type: 'integer', nullable: false })
  regon: number;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'text', nullable: false })
  postal_code: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'text', nullable: false })
  phone_number: string;
}
