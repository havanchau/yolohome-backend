import { ApiProperty } from '@nestjs/swagger';
import { BaseDeviceSalerDto } from './base-saler.device.dto';

export class UpdateDeviceSalerDto extends BaseDeviceSalerDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}