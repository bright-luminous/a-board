import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateCommunityParams } from 'src/community/community.dto';
import { CreatePostParams, UpdatePostParams } from './post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get("id")
  getPostByID(@Query('id') id: string) {
    return this.postService.getPostByID(id);
  }

  @Get("detail")
  getPostFullDetail() {
    return this.postService.getPostByDetail();
  }

  @Get("community")
  getPostByCommunity(@Query('community') selectedCommunity: string, @Query('owner') ownerPost: string) {
    return this.postService.getPostByCommunity(selectedCommunity,ownerPost);
  }

  @Get("owner")
  getPostByOwner(@Query('owner') currentOwner: string) {
    return this.postService.getPostByOwner(currentOwner);
  }

  @Post()
  async createPost(@Body() createPostParams: CreatePostParams) {
    return this.postService.createPost(createPostParams);
  }

  @Put()
  async updatePost(@Body() updatePostParams: UpdatePostParams) {
    return this.postService.updatePost(updatePostParams);
  }

  @Delete()
  async deletePost(@Query('id') id: string) {
    return this.postService.deletePost(id);
  }
}
