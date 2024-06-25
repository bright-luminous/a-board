import { Body, Controller, Delete, Get, Post, Query, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserParams } from './user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('id')
  getUserByID(@Query('id') id: string) {
    return this.userService.getUserByID(id);
  }

  @Get('username')
  async getUserByUsername(@Query('username') username: string,@Res({ passthrough: true }) response: Response) {
    var resultUser = await this.userService.getUserByUsername(username)
    response.cookie("userDetail",resultUser, {httpOnly:true, sameSite: 'none', maxAge: 90 * 24 * 60 * 60 * 1000})
    return resultUser;
  }

  @Post()
  async createUser(@Body() createUserParams: CreateUserParams){
    return this.userService.createUser(createUserParams);
  }

  @Delete()
  async deleteUser(@Query('id') id: string){
    return this.userService.deleteUser(id);
  }
}
