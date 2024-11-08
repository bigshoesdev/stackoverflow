import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User, Answer, Question } from "@models/index";

@Table({ tableName: "comments" })
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.TEXT)
  body!: string;

  @Column(DataType.DATE)
  creationDate!: Date;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => Question)
  @Column(DataType.INTEGER)
  questionId!: number;

  @ForeignKey(() => Answer)
  @Column(DataType.INTEGER)
  answerId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Question)
  question!: Question;

  @BelongsTo(() => Answer)
  answer!: Answer;
}
