import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString()
    content: string;
}