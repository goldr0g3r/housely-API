import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/interface/auth/enum/Roles';

export const AllowRoles = Reflector.createDecorator<Roles[]>();
