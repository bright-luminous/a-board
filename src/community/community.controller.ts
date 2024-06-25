import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityParams } from './community.dto';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Get()
  getCommunities() {
    return this.communityService.getCommunities();
  }

  @Get('id')
  getCommunityByID(@Query('id') id: string) {
    return this.communityService.getCommunityByID(id);
  }

  @Post()
  async createCommunity(@Body() createCommunityParams: CreateCommunityParams) {
    return this.communityService.createCommunity(createCommunityParams);
  }

  @Delete()
  async deleteCommunity(@Query('id') id: string) {
    return this.communityService.deleteCommunity(id);
  }
}
