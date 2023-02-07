import { auth } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class OAuthProfileDto implements Required<auth.OAuthProfile> {
  @IsString()
  name: string;

  @IsNumber()
  providerId: number;

  @IsString()
  email: string;

  @IsEnum(auth.Provider)
  provider: auth.Provider;
}
