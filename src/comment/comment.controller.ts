import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentParams } from './comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  getComments() {
    return this.commentService.getComments();
  }

  @Get()
  getCommentByID(@Query('id') id: string) {
    return this.commentService.getCommentByID(id);
  }

  @Post()
  async createComment(@Body() createCommentParams: CreateCommentParams) {
    return this.commentService.createComment(createCommentParams);
  }

  @Delete()
  async deleteComment(@Query('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
