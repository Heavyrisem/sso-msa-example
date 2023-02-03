import { Timestamp, TokenPayload } from '@heavyrisem/sso-msa-example-proto';
import { IsNotEmptyObject, IsNumber, IsString } from 'class-validator';

export class CreateTokenDto implements TokenPayload {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNotEmptyObject({ nullable: false })
  expire: Timestamp;
}
