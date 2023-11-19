import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import type { CreateBlogDto } from './blog-models';
import type { Blog } from './blog-schema';
import { BlogService } from './blog-service';

@Controller()
export class BlogApiController {
  constructor(private readonly blogService: BlogService) {}

  @Post('api/blog')
  async create(@Body() dto: CreateBlogDto): Promise<Blog> {
    return await this.blogService.create(dto);
  }

  @Put('api/blog/:id')
  async update(@Param('id') id: string, @Body() dto: CreateBlogDto): Promise<Blog> {
    return await this.blogService.update(id, dto);
  }

  @Get('api/blog')
  async getAll(): Promise<Blog[]> {
    return await this.blogService.getAll();
  }

  @Get('api/blog/:id')
  getById(@Param('id') prodId: string): Promise<Blog> {
    return this.blogService.getById(prodId);
  }
}