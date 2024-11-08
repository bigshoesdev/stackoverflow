import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User, Answer, Comment } from "@models/index";

@Table({ tableName: "questions" })
export class Question extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  body!: string;

  @Column(DataType.DATE)
  creationDate!: Date;

  @Column(DataType.INTEGER)
  score!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Answer)
  answers!: Answer[];

  @HasMany(() => Comment)
  comments!: Comment[];
}
