import { Provider, OAuthRequest } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsString } from 'class-validator';

export class OAuthRequestDto implements OAuthRequest {
  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  code: string;

  @IsString()
  redirect: string;

  @IsString()
  callback: string;
}
