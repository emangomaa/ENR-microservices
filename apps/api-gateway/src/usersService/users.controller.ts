import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, USER_PATTERNS, UserRole } from 'libs/common/index';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

   @Post('/')
  createUser(@Body() dto:CreateUserDto){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.CREATE_USER,dto))
  }
   @Get('/')
  getAllUsers(){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ALL,{}))
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(
    @CurrentUser() user:AuthenticatedUser){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ONE,user.id))
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userClient.send(USER_PATTERNS.DELETE_ONE,id));
  }

 
}
