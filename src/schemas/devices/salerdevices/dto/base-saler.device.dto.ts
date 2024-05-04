import { ApiProperty } from '@nestjs/swagger';
import { Device } from '../../device.shema';

export class BaseDeviceSalerDto {
  @ApiProperty({
    type: Number,
    description: 'discount',
  })
  discount: number;

  @ApiProperty({
    type: Number,
    description: 'price',
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'amount',
  })
  amount: number;

  @ApiProperty({
    type: Device,
    description: 'information',
  })
  information: Device;

}