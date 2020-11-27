import { IsEmail, Length } from "class-validator";
import brcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { classToPlain, Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();

    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await brcrypt.hash(this.password, 6);
  }

  toJSON() {
    return classToPlain(this);
  }
}
