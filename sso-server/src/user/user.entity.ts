import { Long } from '@grpc/proto-loader';
import { Provider, Shared } from '@heavyrisem/sso-msa-example-proto';
import { Transform } from 'class-transformer';
import { IsEnum, IsString, ValidateIf } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { BigintTransformer } from '~modules/database/transformer/bigint.transformer';
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

  @ValidateIf((_, value) => value instanceof Long)
  @Index()
  @Column({ unique: true })
  providerId: string;

  @IsEnum(Provider)
  @Column({ type: 'varchar', transformer: new ProviderTransformer() })
  provider: Provider;
}
