import { Shared } from '@heavyrisem/sso-msa-example-proto';

import { User } from './user.entity';

export type MergedUser = Shared.UserSSO & Pick<User, 'displayName'>;
