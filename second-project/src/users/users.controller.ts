import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ValidationPipe } from "src/validation/validation.pipe";
import { CreateUserDto } from "src/dto's/createUser.dto";
import { CreateLoginDto } from "src/dto's/loginUser.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('register')
    @HttpCode(201)
    async register(@Body(new ValidationPipe()) registerUser: CreateUserDto) {
        return this.usersService.register(registerUser);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body(new ValidationPipe()) loginUser: CreateLoginDto) {
        return this.usersService.login(loginUser);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async viewUser(@Request() req) {
        return this.usersService.getUser(req.user)
    }

    @Put('profile/:id')
    @HttpCode(200)
    async updateUser(@Param() params: any, @Body() updateUser: CreateUserDto) {
        return this.usersService.updateUser(params.id, updateUser);
    }

    @Delete('profile/:id')
    @HttpCode(200)
    async deleteUser(@Param() params: any) {
        return this.usersService.deleteUser(params.id)
    }

    @Get()
    @UseGuards(RolesGuard)
    @SetMetadata('roles', ['admin'])
    @HttpCode(200)
    async findAllUser() {
        return this.usersService.findAll()
    }
}