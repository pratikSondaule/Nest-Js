import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtContant } from "src/constant/jwt.contanst";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization

        if (!token) {
            throw new UnauthorizedException("Token not found");
        }

        try {
            const payload = await this.jwtService.verify(token, { secret: jwtContant.secret });
            request['user'] = payload

            return true;
        } catch (error) {
            throw new UnauthorizedException("Token not found");
        }
    }
}