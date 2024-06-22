import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserParams } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get()
  getUserByID(@Query('id') id: string) {
    return this.userService.getUserByID(id);
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
