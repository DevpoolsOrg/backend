import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangeRoleDto, CreateUserDto, UpdateUserDto, UserAvatarDto, CreateUserRolesDto } from './dto/';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from './entities/user.entity';
import {  } from './dto/create-user-roles-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(202)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('create-user')
  @HttpCode(202)
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERADMIN)
  createUserWhitRole(@Body() createUserRoleDto: CreateUserRolesDto) {
    return this.usersService.createUserWhitRole(createUserRoleDto );
  };

  @Get()
  @HttpCode(200)
  findAll() {
    return this.usersService.findAll();
  };

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  };

  @Patch(':id')
  @HttpCode(200)
  @Auth(ValidRoles.USER)
  avatar(@GetUser() user: User, @Body() userAvatarDto: UserAvatarDto) {
    return this.usersService.updateAvatar(user.id, userAvatarDto);
  };

  @Patch(':id')
  @HttpCode(202)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  };

  @Patch('change-role/:id')
  @HttpCode(202)
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERADMIN)
  changeRole(@Param('id', ParseUUIDPipe) id: string, @Body() changeRoleDto: ChangeRoleDto) {
    return this.usersService.changeRole(id, changeRoleDto);
  };

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  };

  @Delete('hard-delete/:id')
  @HttpCode(204)
  hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.hardDelete(id);
  };


}
