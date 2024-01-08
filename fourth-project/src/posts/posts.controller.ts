import { Body, Controller, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreatePostDto } from "./dto/createPost.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) { }

    @Post('add')
    @HttpCode(201)
    addPost(@Body() createPost: CreatePostDto) {
        return this.postsService.createPost(createPost)
    }

    @Get()
    @HttpCode(200)
    getAllPosts() {
        return this.postsService.getPosts();
    }

    @Put('update/:id')
    @HttpCode(200)
    updatePost(@Param("id") id: string, @Body() postData: any) {
        return this.postsService.updatePost(Number(id), postData)
    }

    @Put('delete/:id')
    @HttpCode(200)
    deletePost(@Param("id") id: string) {
        return this.postsService.deletePost(Number(id))
    }

    @Get('user-post/:id')
    @HttpCode(200)
    getUserPosts(@Param("id") userId: string) {
        return this.postsService.getUserPosts(userId);
    }
}