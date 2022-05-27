import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/users/enums/roles';

@Injectable()
export class SessionAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super(); /* Если класс наследуется от другого класса всегда необходимо вызывать конструктор базового класса через super */
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const adminRequired = this.reflector.get<boolean>(
      'adminRequired',
      context.getClass() /* сравниение моего декоратора c полученным типом Controller класса, к которому принадлежит данный конкретный обработчик */,
    );
    const request = context.switchToHttp().getRequest();
    const user = request.session.user;
    console.log(adminRequired, request.session);

    if (user) {
      if (adminRequired && user.role === UserRoles.user) {
        return false;
      }
      return true;
    }
    return false;
  }
}
