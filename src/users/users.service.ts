import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { UserStatus, Prisma } from '@prisma/duoclieu-client'
import bycrpt from 'bcrypt'
import { UsersMapper } from './mapper/users.mapper';
import { ResponseCreateUserDto, ResponseUpdateUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly saltOrRound = 10

  async create(data: {full_name: string, email: string, password:string, role_id:number, status: UserStatus, address?: string, date_of_birth?:string, gender?:"Male"|"Female", avatar?: string}):Promise<ResponseCreateUserDto>{
    const new_user:Prisma.UserCreateInput = {...data}
    const hashed_pass = await bycrpt.hash(data.password, this.saltOrRound)
    if (data.date_of_birth){
      const parsed_date = new Date(data.date_of_birth)
      new_user.date_of_birth=parsed_date
    }
    new_user.password = hashed_pass
    const newUser = await this.prisma.user.create({
      data: new_user
    })
    const userRole = await this.prisma.userRole.create({
      data:{
        user_id: newUser.id,
        role_id: data.role_id
      }
    })
    return UsersMapper.toResponseCreateUserDto(newUser)
  }

  async update(user_id:number, data: {full_name?: string, email?: string, old_password?:string, new_password?:string, role_id?:number, status?: UserStatus, address?: string, date_of_birth?:string, gender?:"Male"|"Female", avatar?: string}):Promise<ResponseUpdateUserDto>{
    const old_user_info = await this.prisma.user.findUnique({
      where:{id:user_id}
    })
    const new_user_info:Prisma.UserUpdateInput = {
      address: data.address,
      avatar: data.avatar,
      full_name:data.full_name,
      email:data.email,
      gender:data.gender,
      status:data.status,
    }

    if (!old_user_info){
      throw new NotFoundException('User not found')
    }
    
    if (data.date_of_birth!==undefined){
      const parsed_date = new Date(data.date_of_birth)
      new_user_info.date_of_birth = parsed_date
    }

    if (data.new_password){
      if (data.old_password){
        const matched_pass = bycrpt.compare(data.old_password, old_user_info.password)
        if (!matched_pass){
          throw new UnauthorizedException("Invalid email or password")
        }
        const hashed_pass = await bycrpt.hash(data.new_password, this.saltOrRound)
        new_user_info.password=hashed_pass
      }
      else throw new UnauthorizedException("Invalid email or password")
    }
    const updated_user_info = await this.prisma.user.update({
      data: {
        ...new_user_info,
        updated_at: new Date()
      },
      where: {id:user_id}
    })

    return UsersMapper.toResponseUpdateUserDto(updated_user_info)
  }
}
