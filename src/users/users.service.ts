import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { UserStatus, Prisma, VerificationPurpose, UserRole } from '@prisma/duoclieu-client'
import bycrpt from 'bcrypt'
import { UsersMapper } from './mapper/users.mapper';
import { ResponseCreateUserDto, ResponseForgotPasswordDto, ResponseLoginDto, ResponseUpdateUserDto, ResponseVerifyCodeDto, ResponseCreateManyUserDto } from './dto/response-user.dto';
import { ForgotPasswordDto } from './dto/request-users.dto';
import { EmailService } from '../email/email.service';
import { VerificationHelper } from './utils/verificationHelper';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  private readonly saltOrRound = 10
  private readonly expiryMinute = 5
  private readonly codeDigits = 6
  private readonly defaultPassword = bycrpt.hashSync('123456', this.saltOrRound)

  async create(data: {full_name: string, email: string, password:string, role:UserRole, status: UserStatus, address?: string, date_of_birth?:string, gender?:"Male"|"Female"|"Other", avatar?: string}):Promise<ResponseCreateUserDto>{
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
    return UsersMapper.toResponseCreateUserDto(newUser)
  }

  async createMany(items: {full_name: string, email: string, password:string, role:UserRole, status: UserStatus, address?: string, date_of_birth?:string, gender?:"Male"|"Female"|"Other", avatar?: string}[]): Promise<ResponseCreateManyUserDto> {
    const hashedItems = await Promise.all(items.map(async (data) => {
      const new_user:Prisma.UserCreateInput = {...data}
      const hashed_pass = await bycrpt.hash(data.password, this.saltOrRound)
      if (data.date_of_birth){
        const parsed_date = new Date(data.date_of_birth)
        new_user.date_of_birth=parsed_date
      }
      new_user.password = hashed_pass
      return new_user
    }))
    const createdUsers = await this.prisma.user.createManyAndReturn({
      data: hashedItems
    })
    return UsersMapper.toResponseCreateManyUserDto(createdUsers)
  }

  async login(data:{email: string, password:string}): Promise<ResponseLoginDto>{
    const user = await this.prisma.user.findUnique({
      where:{
        email:data.email,
        password: data.password,
      }
    })
    if (!user){
      throw new UnauthorizedException('Invalid email or password')
    }
    return UsersMapper.toResponseLoginDto(user)
  }

  async update(user_id:number, data: {full_name?: string, email?: string, old_password?:string, new_password?:string, role?:UserRole, status?: UserStatus, address?: string, date_of_birth?:string, gender?:"Male"|"Female"|"Other", avatar?: string}):Promise<ResponseUpdateUserDto>{
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
      role:data.role,
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

  async forgotPassword(data:{email: string}):Promise<ResponseForgotPasswordDto>{
    const user = await this.prisma.user.findUnique({where:{email: data.email}})
    if (user===null) throw new UnauthorizedException('Invalid email')
    const code = VerificationHelper.generateCode(this.codeDigits)

    const expired_at = new Date()
    expired_at.setMinutes(expired_at.getMinutes() + this.expiryMinute)

    const verificationCode = await this.prisma.verificationCode.create({
      data:{
        code,
        purpose:'PASSWORD_RESET',
        expired_at,
        user_id: user.id
      }
    })

    const emailSendResponse = await this.emailService.sendResetPasswordCode(data.email, code, user.full_name)

    if (!emailSendResponse){
      throw new BadRequestException('Fail to send verification code via email')
    }

    return UsersMapper.toResponseForgotPasswordDto(verificationCode, emailSendResponse)
  }

  async verifyCode(data:{user_id:number, verification_code:string, purpose:VerificationPurpose}): Promise<ResponseVerifyCodeDto>{
    const latest_code = await this.prisma.verificationCode.findFirst({
      where:{
        user_id:data.user_id,
        purpose:data.purpose
      },
      orderBy:{
        created_at:'desc'
      }
    })

    if (!latest_code){
      throw new BadRequestException('User not found')
    }

    if (latest_code.code===data.verification_code){
      const user_with_reset_pass = await this.prisma.user.update({
        data:{
          password: this.defaultPassword,
          updated_at: new Date()
        },
        where:{
          id: data.user_id
        }
      })

      return UsersMapper.toResponseVerifyCodeDto(user_with_reset_pass, data.purpose)
    }
    else {
      throw new UnauthorizedException('Invalid verification code')
    }
  }

  async allUsers(filter:{emailOrNamePattern?: string, status?: string, page:number, limit:number}){
    const where = QueryBuilder.buildQueryFilter(filter.emailOrNamePattern, filter.status)
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit)
    const all = await this.prisma.user.findMany({
      where,
      ...pagination
    })

    const total = await this.prisma.user.count({
      where,
      ...pagination
    })
    var n_pages = -1;
    if (filter.page===1){
      const allUserCount = await this.prisma.user.count()
      n_pages = Math.ceil(allUserCount/filter.limit)
    }

    return UsersMapper.toResponseAllUserDto(all, total, n_pages!==-1?n_pages:undefined)

  }
}
