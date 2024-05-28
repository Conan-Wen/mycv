import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { dbConstants } from '../constants/dbConstants';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(dbConstants.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.userRepository.create({
      email,
      password,
    });

    return this.userRepository.save(user);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }

    return this.userRepository.findOneBy({ id });
  }

  find(email: string) {
    return this.userRepository.find({
      where: {
        email,
      },
    });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }
    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return this.userRepository.remove(user);
  }
}
