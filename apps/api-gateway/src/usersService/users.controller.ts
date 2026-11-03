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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

   @Post('/')
  @ApiOperation({ summary: 'Create a user' })
  @ApiCreatedResponse({ description: 'The user was created.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  createUser(@Body() dto:CreateUserDto){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.CREATE_USER,dto))
  }
   @Get('/')
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({ description: 'The users were returned.' })
  getAllUsers(){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ALL,{}))
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiOkResponse({ description: 'The authenticated user was returned.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  getUser(
    @CurrentUser() user:AuthenticatedUser){
    return firstValueFrom(this.userClient.send(USER_PATTERNS.FIND_ONE,user.id))
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a user (admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiOkResponse({ description: 'The user was deleted.' })
  @ApiBadRequestResponse({ description: 'The ID must be an integer.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token and admin role are required.' })
  deleteUser(@Param('id',ParseIntPipe) id: number) {

    return firstValueFrom(this.userClient.send(USER_PATTERNS.DELETE_ONE,id));
  }

 
}
