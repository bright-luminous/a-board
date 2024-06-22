import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateCommunityParams } from 'src/community/community.dto';
import { CreatePostParams } from './post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get()
  getPostByID(@Query('id') id: string) {
    return this.postService.getPostByID(id);
  }

  @Post()
  async createPost(@Body() createPostParams: CreatePostParams) {
    return this.postService.createPost(createPostParams);
  }

  @Delete()
  async deletePost(@Query('id') id: string) {
    return this.postService.deletePost(id);
  }
}
