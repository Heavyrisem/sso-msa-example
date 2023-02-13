import { Shared } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

@Entity()
export class User extends CoreEntity implements Pick<Shared.UserSSO, 'providerId'> {
  @IsString()
  @Column({ unique: true })
  providerId: string;

  @IsString()
  @Column()
  displayName: string;
}
