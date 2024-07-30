import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { fillObject } from '@core/core';
import { UsersRdo } from './rdo/users.rdo';
import { LoginUsersDto } from './dto/login-users.dto';
import { MongoIdValidationPipe } from 'src/pipes/mongo-id-validation.pipe';
import { UsersListRdo } from './rdo/users-list.rdo';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UserLevelDto } from './dto/user-level.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUsersDto) {
    return fillObject(UsersRdo, this.usersService.create(dto));
  }

  @Get('find/:id')
  async findById(@Param('id', MongoIdValidationPipe) id: string) {
    return fillObject(UsersRdo, this.usersService.findById(id));
  }

  @Post('auth')
  async login(@Body() dto: LoginUsersDto) {
    return fillObject(UsersRdo, this.usersService.login(dto));
  }

  @Get('statistic')
  async findUsers() {
    return fillObject(UsersListRdo, this.usersService.find());
  }

  @Post('update')
  async updateUsers(@Body() dto: UpdateUsersDto) {
    return fillObject(UsersRdo, this.usersService.updateUser(dto));
  }

  @Post('update-level')
  async updateLevel(@Body() dto: UserLevelDto) {
    return fillObject(UsersRdo, this.usersService.updateLevel(dto));
  }

  @Get('total')
  async totalCount() {
    return this.usersService.getTotalCount();
  }
}
