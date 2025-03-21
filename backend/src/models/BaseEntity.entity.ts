import {
  CreateDateColumn,
  Generated,
  PrimaryColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
