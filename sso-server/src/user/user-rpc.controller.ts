import {
  UserServiceControllerMethods,
  UserServiceController,
  USER_PACKAGE_NAME,
  StringValue,
} from '@heavyrisem/sso-msa-example-proto';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { User } from './user.entity';
import { UserService } from './user.service';

@RpcController(USER_PACKAGE_NAME, UserServiceControllerMethods)
export class UserRpcController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  async findUserById(id: StringValue): Promise<User> {
    const tmp = await this.userService.findUserByProviderId(id.value);
    console.log(tmp);
    return tmp;
  }
}
