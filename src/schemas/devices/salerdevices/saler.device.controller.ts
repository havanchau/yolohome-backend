import {
    ApiOkResponse,
    ApiTags,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { DeviceSalersService } from './saler.device.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    BadRequestException,
    Query,
} from '@nestjs/common';
import { UpdateDeviceSalerDto } from './dto/update-saler.device.dto';
import { CreateDeviceSalerDto } from './dto/create-saler.device.dto';
import { DeviceSaler } from './saler.device.schema';

@Controller('devicesalers')
@ApiTags('devicesalers')
export class DeviceSalersController {
    constructor(private readonly deviceSalersService: DeviceSalersService) { }

    @Get()
    @ApiOkResponse({
        type: DeviceSaler,
        isArray: true,
    })
    async findAll(@Query() params: any) {
        if (params.name) {
            return this.deviceSalersService.findByName(params.name, params.userId)
        }
        return this.deviceSalersService.findAll();
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Created Successfully',
        type: DeviceSaler,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async create(@Body() createDeviceSalerDto: CreateDeviceSalerDto) {
        try {
            const createdDeviceSaler = await this.deviceSalersService.create(createDeviceSalerDto);
            return createdDeviceSaler;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    @Get(':id')
    @ApiOkResponse({
        type: DeviceSaler,
        isArray: false,
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    async findOne(@Param('id') id: string) {
        const user = await this.deviceSalersService.findById(id);
        if (!user) {
            throw new NotFoundException('Not found');
        }
        return user;
    }

    @Put(':id')
    @ApiOkResponse({
        type: DeviceSaler,
        isArray: false,
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') id: string, @Body() updateDeviceSalerDto: UpdateDeviceSalerDto) {
        return this.deviceSalersService.update(id, updateDeviceSalerDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Deleted Successfully',
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    async delete(@Param('id') id: string) {
        return this.deviceSalersService.delete(id);
    }

    @Get('user/:userId/devices')
    @ApiOkResponse({
        type: DeviceSaler,
        isArray: true,
        description: 'List of devices for a user',
    })
    @ApiNotFoundResponse({
        description: 'No devices found for the user',
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
    })
    async getDevicesByUserId(@Param('userId') userId: string) {
        try {
            const devices = await this.deviceSalersService.getDeviceByUserId(userId);
            if (devices.length === 0) {
                throw new NotFoundException('No devices found for the user');
            }
            return devices;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}