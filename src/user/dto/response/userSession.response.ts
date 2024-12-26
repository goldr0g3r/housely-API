import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { UUID } from 'crypto';
import {
  IUserSessionDevice,
  IUserSession,
} from 'src/common/interface/user/base';
import { TIP_ADDRESS, TREFRESH_TOKEN } from 'src/common/types';
import { v7 as uuidv7 } from 'uuid';
import { APIResponse } from 'src/common/dto/APIResponse';

export class UserSessionDeviceResponse implements IUserSessionDevice {
  @ApiProperty({
    title: 'Device ID',
    description: 'Unique identifier for the device',
    example: uuidv7(),
  })
  @Expose()
  deviceId: UUID;

  @ApiProperty({
    title: 'Device Type',
    description: 'Type of device',
    example: 'desktop browser',
  })
  @Expose()
  deviceType: string;

  @ApiProperty({
    title: 'Device Name',
    description: 'Name of the device',
    example: 'Microsoft Edge (Windows 10.0 - desktop)',
  })
  @Expose()
  deviceName: string;

  @ApiProperty({
    title: 'Device IP',
    description: 'IP address of the device',
    example: '0.0.0.0',
  })
  @Expose()
  deviceIp: TIP_ADDRESS;

  @ApiProperty({
    title: 'Client Type',
    description: 'Type of client',
    example: 'browser',
  })
  @Expose()
  clientType: string;

  @ApiProperty({
    title: 'Client Name',
    description: 'Name of the client',
    example: 'Microsoft Edge',
  })
  @Expose()
  clientName: string;

  @ApiProperty({
    title: 'Client Version',
    description: 'Version of the client',
    example: '120.0',
  })
  @Expose()
  clientVersion: string;

  @ApiProperty({
    title: 'Platform Type',
    description: 'Type of platform',
    example: 'desktop',
  })
  @Expose()
  platformType: string;

  @ApiProperty({
    title: 'Operating System',
    description: 'Name of the operating system',
    example: 'Windows',
  })
  @Expose()
  os: string;

  @ApiProperty({
    title: 'Operating System Version',
    description: 'Version of the operating system',
    example: '10.0',
  })
  @Expose()
  osVersion: string;

  @Exclude()
  refreshToken?: TREFRESH_TOKEN;

  @ApiProperty({
    title: 'Created At',
    description: 'Date and time of creation',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: string;

  @ApiProperty({
    title: 'Updated At',
    description: 'Date and time of last update',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: string;
}

export default class UserSessionResponse
  extends APIResponse
  implements IUserSession
{
  @ApiProperty({
    title: 'User Sessions',
    description: 'These are the logged in sessions of the user',
    type: [UserSessionDeviceResponse],
  })
  @Type(() => UserSessionDeviceResponse)
  @Expose()
  session: UserSessionDeviceResponse[];
}
