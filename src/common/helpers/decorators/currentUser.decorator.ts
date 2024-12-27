import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): string | any | undefined => {
    return context.switchToHttp().getRequest<Request>()?.user;
  },
);
