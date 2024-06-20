import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  owner: User;

  @ManyToOne(() => Post, (post) => post.comments)
  parentPost: Post;

  @CreateDateColumn()
  createAt: Date;
}