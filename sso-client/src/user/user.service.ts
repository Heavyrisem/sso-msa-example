import {
  Shared,
  User,
  UserServiceClient,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@heavyrisem/sso-msa-example-proto';
import { map } from 'rxjs';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { getResultFromObservable } from '~modules/utils/observable.utils';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  findUserById(id: User['providerId']): Promise<Shared.UserSSO> {
    return getResultFromObservable(
      this.userService.findUserById({ value: id.toString() }).pipe(map(this.transformUser)),
    );
  }

  // rpc를 타면서 빈 값을 가진 필드는 아예 사라지기 때문에 여기서 수동으로 Null 주입을 시켜주어야 함
  private transformUser(user: Shared.UserSSO): Shared.UserSSO {
    console.log(user);
    return {
      ...user,
      email: user.email || null,
      profileImage: user.profileImage || null,
      createdAt: +`${user.createdAt}`,
      deletedAt: user.deletedAt ? +`${user.deletedAt}` : null,
    };
  }
}
