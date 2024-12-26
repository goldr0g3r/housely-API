import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class APIResponse {
  @Expose()
  @ApiProperty({
    title: 'Status',
    description: 'Status of the request',
    example: 'success',
  })
  status: string;

  @Expose()
  @ApiProperty({
    title: 'Message',
    description: 'Message from the request',
    example: 'Request was successful',
  })
  message: string;
}
