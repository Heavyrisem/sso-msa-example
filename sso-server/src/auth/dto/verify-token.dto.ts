import { Token } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';

export class VerifyTokenDto implements Token {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
