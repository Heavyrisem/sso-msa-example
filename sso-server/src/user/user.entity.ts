import { Provider, Shared } from '@heavyrisem/sso-msa-example-proto';
import { Column, Entity, Index } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

import { ProviderTransformer } from './provider.transformer';

@Entity()
export class User extends CoreEntity implements Shared.UserSSO {
  @Column({ nullable: true })
  email: string | null;

  @Column()
  name: string;

  @Column()
  profileImage: string;

  @Index()
  @Column({ unique: true }) // TODO: make number
  providerId: number;

  @Column({ type: 'varchar', transformer: new ProviderTransformer() })
  provider: Provider;
}
