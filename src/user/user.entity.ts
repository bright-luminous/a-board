import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  tel: string;

  @Column()
  name: string;

  @Column()
  lineID: string;

  @CreateDateColumn()
  createAt: Date;
}