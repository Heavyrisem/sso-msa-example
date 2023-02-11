import { Shared } from '@heavyrisem/sso-msa-example-proto';

import { PickType } from '@nestjs/mapped-types';

import { User } from '~src/user/user.entity';

export class CreateTokenDto
  extends PickType(User, ['name', 'providerId', 'email', 'provider', 'profileImage'] as const)
  implements Shared.OAuthProfile
{
  email: User['email'] | null = null;
  profileImage: User['profileImage'] | null = null;
}
