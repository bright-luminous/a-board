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
    return await this.postRepository.findOne({ where: { id: id } });
  }

  async createPost(createPostParams: CreatePostParams): Promise<Post> {
    var newPost = new Post();
    newPost.title = createPostParams.title;
    newPost.content = createPostParams.content;
    let owner = await this.userService.getUserByID(createPostParams.owner);
    newPost.owner = owner;
    let community = await this.communityService.getCommunityByID(createPostParams.community);
    newPost.community = community;

    return await this.postRepository.save(newPost);
  }

  async updatePost(updatePostParams: UpdatePostParams) {
    var newPost = new Post();
    newPost.title = updatePostParams.title;
    newPost.content = updatePostParams.content;

    return await this.postRepository.save(newPost);
  }

  async deletePost(id: string) {
    return await this.postRepository.delete(id);
  }
}
