import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserParams } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getJobs() {
    return this.userService.getUsers();
  }

  @Post()
  async createNote(@Body() createUserParams: CreateUserParams){
    return this.userService.createUser(createUserParams);
  }

  @Delete()
  async deleteNote(@Query('id') id: string){
    return this.userService.deleteUser(id);
  }
}
