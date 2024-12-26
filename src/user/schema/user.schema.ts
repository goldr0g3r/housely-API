import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { IUserSession, IUser } from 'src/common/interface/user/base';
import { v7 as uuidV7 } from 'uuid';
import {
  UserSessionDeviceSchema,
  UserSessionDeviceSchemaObject,
} from './userSession.schema';

@Schema({ timestamps: true })
export class UserSchema implements IUser, IUserSession {
  @Prop({ required: true, default: () => uuidV7() })
  id: UUID;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, default: false })
  isAgent: boolean;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;

  @Prop({ required: true, default: [] })
  roles: string[];

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: false })
  isBanned: boolean;

  @Prop()
  banReason?: string;

  @Prop({ required: true, default: [], type: [UserSessionDeviceSchemaObject] })
  session: UserSessionDeviceSchema[];
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema);
