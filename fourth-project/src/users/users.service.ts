import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "prisma.service";
import { jwtContant } from "./constant/jwt.constant";


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async register(createUser) {

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: createUser.email,
            },
        })

        if (existingUser) {
            return { msg: "This email is already registered" }
        }

        if (createUser.password !== createUser.confirmpassword) {
            return { msg: "Password and Confirm password must be same" }
        }

        const genSalt = 10
        const password = createUser.password
        const confirmpassword = createUser.confirmpassword

        const hash_password = await bcrypt.hash(password, genSalt)
        const hash_confirmpassword = await bcrypt.hash(confirmpassword, genSalt)


        const newUser = await this.prisma.user.create({
            data: {
                ...createUser,
                password: hash_password,
                confirmpassword: hash_confirmpassword,
            }
        })

        return { msg: "User registered successfully", user: newUser }
    }

    async login(loginUser) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: loginUser.email
            }
        })

        if (!user) {
            return { msg: "User not found" }
        }

        const isMatch = await bcrypt.compare(loginUser.password, user.password)

        if (!isMatch) {
            return { msg: "Invalid Credentials" }
        }

        const payload = {
            name: user.name,
            email: user.email,
            role: user.role
        }
        console.log(payload);

        const token = await this.jwtService.sign(payload, { secret: jwtContant.secret })

        return { msg: "User login successfully", token }
    }

    async authenticate(user: any) {
        const findUser = await this.prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (!findUser) {
            return { msg: "Unauthorized token" }
        }

        return { msg: "User found successfully", findUser }
    }

    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return { msg: "User not found" }
        }

        return { msg: "User found successfully", user }
    }

    async updateUser(id, updateUser) {
        const userToUpdate = await this.prisma.user.update({
            where: { id },
            data: {
                name: updateUser.name ? updateUser.name : null,
                email: updateUser.email ? updateUser.email : null,
                updatedAt: new Date()
            }
        })

        if (!userToUpdate) {
            return { msg: "User not found" }
        }

        return { msg: "User updated successfully", updateUser }
    }

    async deleteUser(id) {
        const userToDelete = await this.prisma.user.update({
            where: { id },
            data: {
                delete: true,
                deletedAt: new Date(),
            }
        })

        if (!userToDelete) {
            return { msg: "User not found" }
        }

        return { msg: "User deleted successfully" }
    }

    async getUsers() {
        const users = await this.prisma.user.findMany({
            where: { delete: false }
        })

        if (users.length === 0) {
            return { msg: "No users found", users }
        }

        return { msg: "Users found successfully", users };
    }
}