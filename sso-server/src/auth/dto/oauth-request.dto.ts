import { auth } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsString } from 'class-validator';

export class OAuthRequestDto implements Required<auth.OAuthRequest> {
  @IsEnum(auth.Provider)
  provider: auth.Provider;

  @IsString()
  code: string;

  @IsString()
  redirect: string;

  @IsString()
  callback: string;
}
