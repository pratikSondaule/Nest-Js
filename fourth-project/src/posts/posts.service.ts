import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma.service";

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) { }

    async createPost(addPost) {

        const post = await this.prisma.post.create({
            data: {
                title: addPost.title,
                content: addPost.content,
                authorId: addPost.authorId
            }
        })

        return { msg: "Post created successfully", post }
    }

    async getPosts() {
        const posts = await this.prisma.post.findMany({
            where: { delete: false }
        })
        if (!posts) {
            return { msg: "No post found" }
        }
        return { msg: "Posts found successfully", posts }
    }

    async updatePost(id, post) {
        const postToUpdate = await this.prisma.post.update({
            where: { id },
            data: {
                title: post.title || undefined,
                content: post.content || undefined,
                updatedAt: new Date()
            }
        })
        if (!postToUpdate) {
            return { msg: 'Post not found' }
        }
        return { msg: 'Post has been updated', post: postToUpdate }
    }

    async deletePost(id) {
        const postToDelete = await this.prisma.post.update({
            where: { id },
            data: {
                delete: true,
                deletedAt: new Date()
            }
        })
        if (!postToDelete) {
            return { msg: 'Post not found' }
        }
        return { msg: 'Post has been deleted' }
    }

    async getUserPosts(userId) {
        const userPosts = await this.prisma.post.findMany({
            where: {
                authorId: {
                    equals: Number(userId)
                },
                AND: {
                    delete: { equals: false }
                }
            }
        });

        if (userPosts.length === 0) {
            return { msg: "No post found" }
        }

        return { msg: "Users post found successfully", userPosts }
    }
}