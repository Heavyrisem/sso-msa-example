import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GoogleUser } from '~src/auth/auth.interface';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async findUserByIdOrSave(user: GoogleUser) {
    const existUser = await this.userRepository.findOne({ where: { providerId: user.providerId } });
    if (existUser) return existUser;

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
