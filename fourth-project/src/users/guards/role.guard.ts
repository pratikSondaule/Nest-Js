import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const roles = this.reflector.get<string[]>('role', context.getHandler())

        if (!roles) {
            return false;
        }

        // console.log("Role ", roles);

        const token = request.headers.authorization
        const userRole = this.jwtService.decode(token)

        return roles.includes(userRole['role'])
    }
}