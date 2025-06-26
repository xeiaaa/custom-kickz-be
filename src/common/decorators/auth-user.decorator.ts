import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/features/user/user.schema';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    return request['authUser'] as UserDocument | null;
  },
);
