import { auth } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';

export class VerifyTokenDto implements Required<auth.Token> {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
