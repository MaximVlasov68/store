import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user-dto';
import { createHash } from 'crypto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async findByTelephone(telephoneNumber: string): Promise<User> {
    return this.userRepository.findOne({ telephoneNumber });
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const salt = await genSalt(10);
    registerUserDto.password = await hash(registerUserDto.password, salt);
    const user = await this.userRepository.create(registerUserDto);
    return this.userRepository.save(user);
  }
}
