import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserRoles } from "src/users/enums/roles";

@Injectable()
export class SessionAuthGuard extends AuthGuard('local') {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const adminRequired = this.reflector.get<string[]>('adminRequired', context.getClass());
        const request = context.switchToHttp().getRequest();
        console.log(request.session);
        const user = request.session.user;
        if (adminRequired && user.role === UserRoles.user) {
            return false
        }
        return !!user;
    }

}