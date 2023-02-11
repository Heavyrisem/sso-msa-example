import { OAuthRequest } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';

import { PickType } from '@nestjs/mapped-types';

import { User } from '~src/user/user.entity';

export class OAuthRequestDto extends PickType(User, ['provider'] as const) implements OAuthRequest {
  @IsString()
  code: string;

  @IsString()
  redirect: string;

  @IsString()
  callback: string;
}
