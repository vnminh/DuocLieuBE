import { Body, Controller, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginDto, ForgotPasswordDto, VerifyCodeDto } from './dto/request-users.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.usersService.login(loginDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto){
    return this.usersService.forgotPassword(forgotPasswordDto)
  }  
  
  @Post('verify-code')
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto){
    return this.usersService.verifyCode(verifyCodeDto)
  }  


  @Put('user/:id')
  async update(@Param('id', ParseIntPipe) user_id: number, @Body() updateUserDto: UpdateUserDto ){
    return this.usersService.update(user_id, updateUserDto)
  }




}
