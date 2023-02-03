import { auth } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';

export class VerifyTokenDto implements auth.Token {
  @IsString()
  token: string;
}
