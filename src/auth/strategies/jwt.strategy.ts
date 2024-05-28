import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../constants/jwtConstants';
import { UsersService } from '../../users/users.service';
import { UserPayload } from '../types/user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersSevice: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(userPlayload: UserPayload) {
    const { sub } = userPlayload;
    const user = await this.usersSevice.findOne(sub);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
