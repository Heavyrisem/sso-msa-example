import { Provider, Shared } from '@heavyrisem/sso-msa-example-proto';
import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';

export class OAuthProfileDto implements Shared.OAuthProfile {
  @IsString()
  name: string;

  @IsString()
  providerId: string;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  email: string | null = null;

  @IsEnum(Provider)
  provider: Provider;
}
