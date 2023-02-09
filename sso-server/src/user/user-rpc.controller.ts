import {
  UserServiceController,
  USER_PACKAGE_NAME,
  StringValue,
  USER_SERVICE_NAME,
} from '@heavyrisem/sso-msa-example-proto';

import { GrpcMethod } from '@nestjs/microservices';

import { RpcController } from '~modules/common/rpc-controller.decorator';

import { User } from './user.entity';
import { UserService } from './user.service';

@RpcController(USER_PACKAGE_NAME)
export class UserRpcController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME)
  async findUserById(id: StringValue): Promise<User> {
    return this.userService.findUserByProviderId(id.value);
  }
}
