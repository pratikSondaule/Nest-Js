import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto's/createUser.dto";

@Injectable()
export class UsersService {
    users: CreateUserDto[] = []
    constructor(private jwtService: JwtService) { }

    register(user) {
        const existingUser = this.users.find((u) => u.email === user.email)

        if (existingUser) {
            return { msg: "This email is already rigister" }
        }

        if (user.password !== user.confirmpassword) {
            return { msg: 'Password and Confirm password is not same' }
        }
        const newUser = { ...user }

        this.users.push(newUser)

        return { msg: "User register successfully", user: newUser }
    }

    login(login) {
        const user = this.users.find((user) => user.email === login.email)

        if (!user || user.password !== login.password) {
            return { msg: 'Invalid Credentials' }
        }

        const payload = { email: login.email, role: user.role }
        const token = this.jwtService.sign(payload)

        return { msg: "User login successfully", user, token }
    }

    getUser(user: any) {
        const userProfile = this.users.find((u) => u.email === user.email)

        if (!userProfile) {
            return { msg: 'No user found' }
        }

        return { msg: "User found successfully", userProfile }
    }

    updateUser(id, updateUser) {
        const userToUpdate = this.users.find((u) => u.id === id)

        if (!userToUpdate) {
            return { msg: 'User not found' }
        } else {
            userToUpdate.username = updateUser.username || userToUpdate.username
            userToUpdate.email = updateUser.email || userToUpdate.email
            userToUpdate.password = updateUser.password || userToUpdate.password
            userToUpdate.confirmpassword = updateUser.confirmpassword || userToUpdate.confirmpassword
            userToUpdate.role = updateUser.role || userToUpdate.role
        }

        return { msg: "User updated successfully", userToUpdate }
    }

    deleteUser(id) {
        let userToDelete = this.users.find((u) => u.id === id)

        if (!userToDelete) {
            return { msg: 'User not Found' }
        }

        this.users = this.users.filter((u) => u.id !== id)
        return { msg: "User deleted Successfully" }
    }

    findAll() {
        const users = this.users

        if (users.length === 0) {
            return { msg: "No users found", users }
        }

        return { msg: "Users found successfully", users }
    }



}