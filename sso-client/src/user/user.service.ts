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

  private transformUser(user: Shared.UserSSO): Shared.UserSSO {
    return {
      ...user,
      email: user.email || null,
      createdAt: +`${user.createdAt}`,
      deletedAt: user.deletedAt ? +`${user.deletedAt}` : null,
    };
  }
}
