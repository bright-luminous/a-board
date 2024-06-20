import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment';

@Module({
  providers: [CommentService, Comment],
  controllers: [CommentController]
})
export class CommentModule {}
