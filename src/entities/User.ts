import { IsEmail, Length } from "class-validator";
import brcrypt from "bcrypt";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import Post from "./Post";
import Entity from "./Entity";

@TOEntity("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();

    Object.assign(this, user);
  }

  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address." })
  @Length(1, 255, {
    message: "Email is empty.",
  })
  @Column({ unique: true })
  email: string;

  @Length(3, 255, {
    message: "Must be at least 3 characters long.",
  })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(6, 255, {
    message: "Must be at least 6 characters long.",
  })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await brcrypt.hash(this.password, 6);
  }
}
