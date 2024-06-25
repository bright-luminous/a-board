import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByID(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserByUsername(inputUsername: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username: inputUsername } });
  }

  async createUser(createUserParams: CreateUserParams): Promise<User> {
    var newUser = new User();
    newUser.username = createUserParams.username;
    newUser.displayName = createUserParams.displayName;

    return await this.userRepository.save(newUser);
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
