import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusValues } from '@modules/service-provider-access/registration/core/value-objects/status/status.value-object';

@Entity('service_provider')
export class ServiceProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  business_name: string;

  @Column({ type: 'text', nullable: false })
  password: string;

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

  @Column({ type: 'enum', enum: StatusValues, default: StatusValues.AWAITING_CONFIRMATION })
  status: string;

  @Column({ type: 'timestamptz', nullable: false })
  registered_at: Date;
}
