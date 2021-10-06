import { UserResult, TweetResult } from '../../../shared/ApiResults';

export interface UserObject extends Omit<UserResult, 'createdAt'> {
  createdAt: Date;
}

export interface TweetObject extends Omit<TweetResult, 'createdAt' | 'user'> {
  createdAt: Date;
  user: UserObject;
}
