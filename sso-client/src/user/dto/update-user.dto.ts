import { PickType } from '@nestjs/mapped-types';

import { User } from '../user.entity';

export class UpdateUserDto extends PickType(User, ['displayName']) {}
