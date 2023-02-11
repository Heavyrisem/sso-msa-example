import { Provider, Shared } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { CoreEntity } from '~src/modules/database/core.entity';

import { ProviderTransformer } from './provider.transformer';

@Entity()
export class User extends CoreEntity implements Shared.UserSSO {
  @IsString()
  @ValidateIf((_, value) => value !== null)
  @Column({ nullable: true })
  email: string | null;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  @Column({ nullable: true })
  profileImage: string;

  @IsString()
  @Index()
  @Column({ unique: true })
  providerId: string;

  @IsEnum(Provider)
  @Column({ type: 'varchar', transformer: new ProviderTransformer() })
  provider: Provider;
}
