import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import {
  InvalidTokenException,
  MissingTokenException,
  TokenExpiredException,
} from 'src/shared/exceptions/custom-exceptions';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new MissingTokenException();
    }
    if (info instanceof TokenExpiredError) {
      throw new TokenExpiredException();
    }

    if (info instanceof JsonWebTokenError) {
      throw new InvalidTokenException();
    }

    if (!user && !info) {
      throw new MissingTokenException();
    }

    if (err || !user) {
      throw new InvalidTokenException();
    }

    return user;
  }
}
