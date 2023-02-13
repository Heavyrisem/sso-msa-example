import {
  Shared,
  UserServiceClient,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@heavyrisem/sso-msa-example-proto';
import { map } from 'rxjs';
import { Repository } from 'typeorm';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { getResultFromObservable } from '~modules/utils/observable.utils';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { MergedUser } from './user.interface';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(USER_PACKAGE_NAME) private readonly client: ClientGrpc,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async getMergedUser(id: Shared.UserSSO['providerId']): Promise<MergedUser> {
    const ssoUser = await this.findSSOUserById(id);
    if (!ssoUser) throw new NotFoundException('SSOUser not found');
    const serviceUser = await this.findUserById(id);
    if (!serviceUser) throw new NotFoundException('ServiceUser not found');

    return this.mergeUserData(ssoUser, serviceUser);
  }

  mergeUserData(ssoUser: Shared.UserSSO, serviceUser: User): MergedUser {
    return {
      ...ssoUser,
      displayName: serviceUser.displayName,
    };
  }

  findSSOUserById(id: Shared.UserSSO['providerId']): Promise<Shared.UserSSO | null> {
    return getResultFromObservable(
      this.userService.findUserById({ value: id.toString() }).pipe(map(this.transformUser)),
    );
  }

  findUserById(id: User['providerId']): Promise<User> {
    return this.userRepository.findOne({ where: { providerId: id } });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const existUser = await this.findUserById(userData.providerId);
    if (existUser) throw new ConflictException('User already exists');

    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async updateUser(providerId: User['providerId'], newData: UpdateUserDto): Promise<User> {
    const existUser = await this.findUserById(providerId);
    if (!existUser) throw new NotFoundException('User not found');

    const mergedUser = this.userRepository.merge(existUser, newData);
    return this.userRepository.save(mergedUser);
  }

  // rpc를 타면서 빈 값을 가진 필드는 아예 사라지기 때문에 여기서 수동으로 Null 주입을 시켜주어야 함
  private transformUser(user: Shared.UserSSO): Shared.UserSSO {
    return {
      ...user,
      email: user.email || null,
      profileImage: user.profileImage || null,
      createdAt: +`${user.createdAt}`,
      deletedAt: user.deletedAt ? +`${user.deletedAt}` : null,
    };
  }
}
