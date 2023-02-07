import { Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity {
  @Column()
  providerId: number;
}
