import { Comment } from 'src/comment/comment.entity';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  displayName: string;

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];

  @CreateDateColumn()
  createAt: Date;
}