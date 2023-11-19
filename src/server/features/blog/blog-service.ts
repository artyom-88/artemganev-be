import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { CreateBlogDto, UpdateBlogDto } from './blog-models';
import { Blog } from './blog-schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    console.log(`BlogService create(${JSON.stringify(createBlogDto, null, 1)})`);
    // TODO: temporary solution before dates migration
    const date = new Date(createBlogDto.date);
    const blog = new this.blogModel({ ...createBlogDto, date });
    return blog.save();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    console.log(`BlogService update(${id}, ${JSON.stringify(updateBlogDto, null, 1)})`);
    // TODO: temporary solution before dates migration
    const date = new Date(updateBlogDto.date);
    const blog = await this.blogModel.findByIdAndUpdate(id, { ...updateBlogDto, date }, { new: true });
    if (!blog) {
      throw new InternalServerErrorException('Could not update blogReducer record.');
    }
    return blog;
  }

  async getAll(): Promise<Blog[]> {
    return await this.blogModel.find({}).sort({ date: 'desc' }).exec();
  }

  async getById(id: string): Promise<Blog> {
    let blog;
    try {
      blog = await this.blogModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find blogReducer record.');
    }
    if (!blog) {
      throw new NotFoundException('Could not find blogReducer record.');
    }
    return blog;
  }
}