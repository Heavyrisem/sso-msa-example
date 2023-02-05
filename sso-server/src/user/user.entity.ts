import { Column, Entity } from 'typeorm';

import { PROVIDER } from '~src/auth/auth.interface';
import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  provider: PROVIDER;

  @Column()
  providerId: string;
}
