import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { DatabaseModule } from 'src/database/database.module';
import { communityProviders } from './community.providers';

@Module({
  imports:[DatabaseModule],
  providers: [CommunityService, ...communityProviders],
  controllers: [CommunityController],
  exports:[CommunityService],
})
export class CommunityModule {}
