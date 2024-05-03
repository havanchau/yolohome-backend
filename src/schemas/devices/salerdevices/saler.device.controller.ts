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
    Query,
} from '@nestjs/common';
import { UpdateDeviceSalerDto } from './dto/update-saler.device.dto';
import { CreateDeviceSalerDto } from './dto/create-saler.device.dto';
import { DeviceSaler } from './saler.device.schema';

@Controller('devicesalers')
@ApiTags('devicesalers')
export class DeviceSalerController {
    constructor(private readonly deviceSalersService: DeviceSalersService) { }

    @Get()
    @ApiOkResponse({
        type: DeviceSaler,
        isArray: true,
    })
    async findAll(@Query() params: any) {
        if (params.name) {
            return this.deviceSalersService.findByName(params.name)
        }
        return this.deviceSalersService.findAll();
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Created Succesfully',
        type: DeviceSaler,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async create(@Body() createDeviceSalerDto: CreateDeviceSalerDto) {
        return this.deviceSalersService.create(createDeviceSalerDto);
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
}