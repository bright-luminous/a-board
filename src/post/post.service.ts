import { Inject, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostParams, UpdatePostParams } from './post.dto';
import { UserService } from 'src/user/user.service';
import { CommunityService } from 'src/community/community.service';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly communityService: CommunityService,
  ) {}

  async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostByID(id: string): Promise<Post> {
    const res = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.community', 'community')
        .leftJoinAndSelect('post.owner', 'user')
        .leftJoinAndSelect('post.comments', 'comment')
        .where('post.id = :id', { id: id })
        .getOne();
    return res;
  }

  async getPostByDetail(): Promise<Post[]> {
    const res = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.community', 'community')
      .leftJoinAndSelect('post.owner', 'user')
      .leftJoinAndSelect('post.comments', 'comment')
      .getMany();
    return res;
  }

  async getPostByCommunity(
    selectedCommunity: string,
    ownerID: string,
  ): Promise<Post[]> {
    if (selectedCommunity == '' && ownerID == '') {
      const res = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.community', 'community')
        .leftJoinAndSelect('post.owner', 'user')
        .leftJoinAndSelect('post.comments', 'comment')
        .orderBy("post.createAt", "DESC")
        .getMany();
      return res;
    }
    if (selectedCommunity == '' && ownerID != '') {
      const res = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.community', 'community')
        .leftJoinAndSelect('post.owner', 'user')
        .leftJoinAndSelect('post.comments', 'comment')
        .where('user.id = :id', { id: ownerID })
        .orderBy("post.createAt", "DESC")
        .getMany();
      return res;
    }
    if (selectedCommunity != '' && ownerID == '') {
      const res = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.community', 'community')
        .leftJoinAndSelect('post.owner', 'user')
        .leftJoinAndSelect('post.comments', 'comment')
        .where('community.name = :community', { community: selectedCommunity })
        .orderBy("post.createAt", "DESC")
        .getMany();
      return res;
    }
    const res = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.community', 'community')
      .leftJoinAndSelect('post.owner', 'user')
      .leftJoinAndSelect('post.comments', 'comment')
      .where('user.id = :id', { id: ownerID })
      .andWhere('community.name = :community', { community: selectedCommunity })
      .orderBy("post.createAt", "DESC")
      .getMany();
    return res;
  }

  async getPostByOwner(ownerID: string): Promise<Post[]> {
    const res = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.community', 'community')
      .leftJoinAndSelect('post.owner', 'user')
      .where('user.id = :id', { id: ownerID })
      .getMany();
    return res;
  }

  async createPost(createPostParams: CreatePostParams): Promise<Post> {
    var newPost = new Post();
    newPost.title = createPostParams.title;
    newPost.content = createPostParams.content;
    let owner = await this.userService.getUserByID(createPostParams.owner);
    newPost.owner = owner;
    let community = await this.communityService.getCommunityByID(
      createPostParams.community,
    );
    newPost.community = community;

    return await this.postRepository.save(newPost);
  }

  async updatePost(updatePostParams: UpdatePostParams) {
    var newPost = await this.getPostByID(updatePostParams.id)
    newPost.title = updatePostParams.title;
    newPost.content = updatePostParams.content;
    let community = await this.communityService.getCommunityByID(
      updatePostParams.community,
    );
    newPost.community = community;

    return await this.postRepository.save(newPost);
  }

  async deletePost(id: string) {
    return await this.postRepository.delete(id);
  }
}
