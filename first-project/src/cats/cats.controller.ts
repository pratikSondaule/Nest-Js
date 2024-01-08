import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cats.interface";
import { CreateCatDto } from "./dto/cat.dto";

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Post('add-cat')
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto)
    }

    @Get('all-cats')
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: any): Promise<Cat> {
        return this.catsService.findOne(params.id)
    }

    @Put('update-cat/:id')
    async updateOne(@Param() params: any, @Body() cat: Cat): Promise<Cat> {
        return this.catsService.updateOne(params.id, cat)
    }

    @Delete('delete-cat/:id')
    async deleteOne(@Param() params: any) {
        return this.catsService.deleteOne(params.id)
    }

}