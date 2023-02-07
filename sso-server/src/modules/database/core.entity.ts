import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import { DateTransformer } from './date.transformer';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: new DateTransformer(),
    nullable: true,
  })
  createdAt: number;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: new DateTransformer(),
    nullable: true,
  })
  deletedAt: number;
}
