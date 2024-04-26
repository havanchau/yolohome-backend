import { ApiProperty } from '@nestjs/swagger';
import { BaseMessageDto } from './base-message.dto';

export class UpdateMessageDto extends BaseMessageDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}