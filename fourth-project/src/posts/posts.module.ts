import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { PrismaService } from "prisma.service";

@Module({
    controllers: [PostsController],
    providers: [PostsService, PrismaService],
    exports: [PrismaService, PrismaService]
})
export class PostsModule {
    constructor(private prisma: PrismaService) { }
}