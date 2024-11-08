export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  body: string;
  answerId: number;
  createdAt: string;
  user?: User;
}

export interface Answer {
  id: number;
  body: string;
  creationDate: string;
  userId: number;
  questionId: number;
  user?: User;
  comments?: Comment[];
}

export interface Question {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  userId: number;
  user?: User;
  answers?: Answer[];
}
