import { Module } from '@nestjs/common';
import { CommunityModule } from './community/community.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CommunityModule, UserModule, PostModule, CommentModule, DatabaseModule],
})
export class AppModule {}
