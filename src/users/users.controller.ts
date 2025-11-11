import { Body, Controller, Inject, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Patch('user/:id')
  async updateUserInfo(@Param('id', ParseIntPipe) user_id: number, @Body() updateUserDto: UpdateUserDto ){
    return this.usersService.update(user_id, updateUserDto)
  }
}
