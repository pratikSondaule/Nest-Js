import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, SetMetadata, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { CreateUserDto } from "./dto's/createUser.dto";
import { LoginUserDto } from "./dto's/loginUser.dto";



@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post('register')
    @HttpCode(201)
    register(@Body() createUser: CreateUserDto) {
        return this.usersService.register(createUser)
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() loginUser: LoginUserDto) {
        return this.usersService.login(loginUser)
    }

    @Get('authenticate')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    authenticate(@Request() req) {
        return this.usersService.authenticate(req.user);
    }

    @Get('profile/:id')
    @HttpCode(200)
    getUserById(@Param("id") id: string) {
        return this.usersService.getUserById(Number(id))
    }

    @Put('profile/:id')
    @HttpCode(200)
    updateProfile(@Param("id") id: string, @Body() userData: any) {
        return this.usersService.updateUser(Number(id), userData);
    }

    @Put('profile/delete/:id')
    @HttpCode(200)
    deleteUser(@Param("id") id: string) {
        return this.usersService.deleteUser(Number(id));
    }

    @Get()
    @UseGuards(RoleGuard)
    @SetMetadata('role', ['Admin'])
    getAllUser() {
        return this.usersService.getUsers();
    }
}