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
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Length(3, undefined, {
    message: "Username must be at least 3 characters long.",
  })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(6, 255)
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await brcrypt.hash(this.password, 6);
  }
}
