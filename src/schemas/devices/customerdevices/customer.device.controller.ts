import {
    ApiOkResponse,
    ApiTags,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { DeviceCustomersService } from './customer.device.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { UpdateDeviceCustomerDto } from './dto/update-customer.device.dto';
import { CreateDeviceCustomerDto } from './dto/create-customer.device.dto';
import { DeviceCustomer } from './customer.device.schema';

@Controller('deviceCustomers')
@ApiTags('deviceCustomers')
export class DeviceCustomerController {
    constructor(private readonly deviceCustomersService: DeviceCustomersService) { }

    
}