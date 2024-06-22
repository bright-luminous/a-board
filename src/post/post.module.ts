import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CommunityModule } from 'src/community/community.module';
import { postProviders } from './post.providers';

@Module({
  imports:[DatabaseModule,UserModule,CommunityModule],
  providers: [PostService,...postProviders],
  controllers: [PostController],
  exports:[PostService],
})
export class PostModule {}
