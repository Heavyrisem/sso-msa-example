import { OAuthProfile, Provider } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class OAuthProfileDto implements Required<OAuthProfile> {
  @IsString()
  name: string;

  @IsNumber()
  providerId: number;

  @IsString()
  email: string;

  @IsEnum(Provider)
  provider: Provider;
}
