import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const passwordCorrect = await compare(password, user.password);
      if (passwordCorrect) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
