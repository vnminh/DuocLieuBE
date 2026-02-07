import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyCodeDto,
  CreateManyUserDto,
} from './dto/request-users.dto';
import { SearchFilterDto } from './dto/request-filters.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('user/many')
  async createMany(@Body() createManyUserDto: CreateManyUserDto) {
    console.log(createManyUserDto.data);
    return this.usersService.createMany(createManyUserDto.data);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.resetPassword(forgotPasswordDto);
  }

  @Post('verify-code')
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.usersService.verifyCode(verifyCodeDto);
  }

  @Get('user/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Put('user/:id')
  async update(
    @Param('id', ParseIntPipe) user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Get('user')
  async allUsers(@Query() filter: SearchFilterDto) {
    return this.usersService.allUsers(filter);
  }
}
