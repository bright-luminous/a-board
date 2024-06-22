import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { commentProviders } from './comment.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports:[DatabaseModule,UserModule,PostModule],
  providers: [CommentService, ...commentProviders],
  controllers: [CommentController]
})
export class CommentModule {}
