import {
    ApiOkResponse,
    ApiTags,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
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
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from "./dto/login.dto"
import { User } from './users.schema';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOkResponse({
        type: User,
        isArray: true,
    })
    async findAll(@Query() params: any) {
        if (params.fullname) {
            return this.usersService.findByName(params.fullname);
        }
        return this.usersService.findAll();
    }

    @Post()
    @ApiCreatedResponse({
        description: 'Created Succesfully',
        type: User,
        isArray: false,
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    @ApiOkResponse({
        type: User,
        isArray: false,
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException('Not found');
        }
        return user;
    }

    @Put(':id')
    @ApiOkResponse({
        type: User,
        isArray: false,
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Deleted Successfully',
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
    @Post('login')
    @ApiOkResponse({
        type: User,
        isArray: false,
    })
    @ApiNotFoundResponse({
        description: 'Not Found',
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    async authenticate(@Body() loginDto: LoginDto) {
        const { email, password } = loginDto;

        if (!email || !password) {
            throw new NotFoundException("No data");
        }

        try {
            return await this.usersService.authenticate(email, password);
        } catch (error) {
            throw new NotFoundException('User not found or Incorrect Password');
        }
    }

}