import { ApiProperty } from '@nestjs/swagger';
import { Device } from '../../device.shema';

export class BaseDeviceCustomerDto {
  @ApiProperty({
    type: String,
    description: 'state',
  })
  state: string;

  @ApiProperty({
    type: Object,
    description: 'information',
  })
  information: Device;

}