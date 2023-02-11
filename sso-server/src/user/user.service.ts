import { OAuthProfile } from '@heavyrisem/sso-msa-example-proto';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserByProviderId(providerId: string): Promise<User> {
    return this.userRepository.findOne({ where: { providerId: providerId } });
  }

  async findUserOrSave(user: OAuthProfile): Promise<User> {
    const existUser = await this.userRepository.findOne({ where: { providerId: user.providerId } });
    if (existUser) {
      const mergedUesr = this.userRepository.merge(existUser, user);
      return this.userRepository.save(mergedUesr);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
