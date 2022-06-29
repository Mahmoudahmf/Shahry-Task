
import { UserModel } from './user.model';
import { CommentModel } from './comment.model';

export class ReviewModel{
  rating : number;
  title:string;
  content:string;
  id:number;
  date:string;
  user:UserModel;
  comments?: CommentModel[];
}
