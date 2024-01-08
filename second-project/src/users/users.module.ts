import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtContant } from "src/constant/jwt.contanst";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtContant.secret,
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
    constructor(private usersService: UsersService) { }
}