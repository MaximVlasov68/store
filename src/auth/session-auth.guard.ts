import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class SessionAuthGuard extends AuthGuard('local') {
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
       const request = context.switchToHttp().getRequest();
       console.log(request.session);
       
       return !!request.session.user;
    }

}