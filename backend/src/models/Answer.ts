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
import { User, Question, Comment } from "@models/index";

@Table({ tableName: "answers" })
export class Answer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  body!: string;

  @Column(DataType.DATE)
  creationDate!: Date;

  @Column(DataType.INTEGER)
  score!: number;

  @Column(DataType.BOOLEAN)
  accepted!: boolean;

  @ForeignKey(() => Question)
  @Column(DataType.INTEGER)
  questionId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => Question)
  question!: Question;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Comment)
  comments!: Comment[];
}
