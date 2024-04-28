import { ApiProperty } from '@nestjs/swagger';

export class BaseMessageDto {

  @ApiProperty({
    type: String,
    description: 'userIdSent',
  })
  userIdSent: string;

  @ApiProperty({
    type: String,
    description: 'userIdReceived',
  })
  userIdReceived: string;

  @ApiProperty({
    type: Date,
    description: 'timeSent',
  })
  timeSent: Date;

  @ApiProperty({
    type: String,
    description: 'content',
  })
  content: string;

}