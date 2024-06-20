import { Comment } from 'src/comment/comment.entity';
import { Community } from 'src/community/community.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.parentPost)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  owner: User;

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @CreateDateColumn()
  createAt: Date;
}