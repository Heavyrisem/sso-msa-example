import { auth } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsString } from 'class-validator';

export class OAuthRequestDto implements Required<auth.OAuthRequest> {
  @IsEnum(auth.PROVIDER)
  provider: auth.PROVIDER;

  @IsString()
  code: string;

  @IsString()
  redirect: string;

  @IsString()
  callback: string;
}
