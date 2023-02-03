import { Token } from '@heavyrisem/sso-msa-example-proto';
import { IsString } from 'class-validator';

export class VerifyTokenDto implements Token {
  @IsString()
  token: string;
}
