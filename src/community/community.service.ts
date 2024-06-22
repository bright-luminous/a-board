import { Inject, Injectable } from '@nestjs/common';
import { Community } from './community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityParams } from './community.dto';

@Injectable()
export class CommunityService {
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private communityRepository: Repository<Community>,
  ) {}

  async getCommunities(): Promise<Community[]> {
    return this.communityRepository.find();
  }

  async getCommunityByID(id: string): Promise<Community> {
    return await this.communityRepository.findOne({ where: { id: id } });
  }

  async createCommunity(createPostParams: CreateCommunityParams): Promise<Community> {
    var newCommunity = new Community();
    newCommunity.name = createPostParams.name;

    return await this.communityRepository.save(newCommunity);
  }

  async deleteCommunity(id: string) {
    return await this.communityRepository.delete(id);
  }
}
