import { ApiProperty } from '@nestjs/swagger';
import { BaseDeviceCustomerDto } from './base-customer.device.dto';

export class UpdateDeviceCustomerDto extends BaseDeviceCustomerDto {
  @ApiProperty({
    type: Date,
    description: 'completedAt',
  })
  completedAt: Date;
}