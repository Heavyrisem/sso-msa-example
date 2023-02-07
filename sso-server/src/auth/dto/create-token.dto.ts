import { OAuthProfile, Provider } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class OAuthProfileDto implements OAuthProfile {
  @IsString()
  name: string;

  @IsNumber()
  providerId: string;

  @IsString()
  email: string;

  @IsEnum(Provider)
  provider: Provider;
}
