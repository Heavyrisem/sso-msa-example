import { auth, google } from '@heavyrisem/sso-msa-example-proto';
import { IsNotEmptyObject, IsNumber, IsString } from 'class-validator';

export class CreateTokenDto implements auth.TokenPayload {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNotEmptyObject({ nullable: false })
  expire: google.protobuf.Timestamp;
}
