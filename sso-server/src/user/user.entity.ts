import { Provider, User as ProtoUser } from '@heavyrisem/sso-msa-example-proto';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity implements ProtoUser {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  providerId: string;

  @Column()
  provider: Provider;
}
