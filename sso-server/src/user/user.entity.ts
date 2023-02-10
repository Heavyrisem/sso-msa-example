import { Provider, Shared } from '@heavyrisem/sso-msa-example-proto';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

import { ProviderTransformer } from './provider.transformer';

@Entity()
export class User extends CoreEntity implements Shared.UserSSO {
  @Column({ nullable: true })
  email: string | null;

  @Column()
  name: string;

  @Column({ unique: true })
  providerId: string;

  @Column({ type: 'varchar', transformer: new ProviderTransformer() })
  provider: Provider;
}
