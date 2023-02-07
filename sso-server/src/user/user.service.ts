import { OAuthProfile } from '@heavyrisem/sso-msa-example-proto';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserByProviderId(providerId: string): Promise<User> {
    return this.userRepository.findOne({ where: { providerId } });
  }

  async findUserOrSave(user: User | OAuthProfile): Promise<User> {
    const existUser = await this.userRepository.findOne({ where: { providerId: user.providerId } });
    if (existUser) return existUser;

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
