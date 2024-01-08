import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "prisma.service";
import { jwtContant } from "./constant/jwt.constant";

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: jwtContant.secret,
    })],
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    exports: [UsersService, PrismaService]
})
export class UsersModule {
    constructor(private usersService: UsersService, private prisma: PrismaService) { }
}