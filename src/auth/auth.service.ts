import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserPayload } from './types/user.payload';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password toghter
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt toghter
    const result = salt + '.' + hash.toString('hex');

    // Create as new user and save it
    const user = await this.usersService.create(email, result);

    const userPayload: UserPayload = { sub: user.id, email: user.email };

    return { id_token: await this.jwtService.signAsync(userPayload) };
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    const userPayload: UserPayload = { sub: user.id, email: user.email };

    return { id_token: await this.jwtService.signAsync(userPayload) };
  }
}
