import { Inject, Injectable } from '@nestjs/common';
import { CreateUserParams } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentParams } from './comment.dto';
import { UserService } from 'src/user/user.service';
import { CommunityService } from 'src/community/community.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async getComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async getCommentByID(id: string): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id: id } });
  }

  async createComment(createCommentParams: CreateCommentParams): Promise<Comment> {
    var newComment = new Comment();
    newComment.content = createCommentParams.content;
    let owner = await this.userService.getUserByID(createCommentParams.owner);
    newComment.owner = owner;
    let parentPost = await this.postService.getPostByID(createCommentParams.parentPost);
    newComment.parentPost = parentPost;

    return await this.commentRepository.save(newComment);
  }

  async deleteComment(id: string) {
    return await this.commentRepository.delete(id);
  }
}
