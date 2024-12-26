import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { IUserSessionDevice } from 'src/common/interface/user/base';
import { TIP_ADDRESS, TREFRESH_TOKEN } from 'src/common/types';
import { v7 as uuidv7 } from 'uuid';

@Schema({ timestamps: true })
export class UserSessionDeviceSchema implements IUserSessionDevice {
  @Prop({ required: true, default: () => uuidv7() })
  deviceId: UUID;

  @Prop()
  deviceType: string;

  @Prop()
  deviceName: string;

  @Prop()
  deviceIp: TIP_ADDRESS;

  @Prop()
  clientType: string;

  @Prop()
  clientName: string;

  @Prop()
  clientVersion: string;

  @Prop()
  platformType: string;

  @Prop()
  os: string;

  @Prop()
  osVersion: string;

  @Prop({ required: false })
  refreshToken?: TREFRESH_TOKEN;
}

export const UserSessionDeviceSchemaObject = SchemaFactory.createForClass(
  UserSessionDeviceSchema,
);
