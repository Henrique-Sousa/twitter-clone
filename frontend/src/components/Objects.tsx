import { UserResult, TweetResult } from '../lib/ApiResult';

export interface UserObject extends Omit<UserResult, 'createdAt'> {
  createdAt: Date;
}

export interface TweetObject extends Omit<TweetResult, 'createdAt' | 'user'> {
  createdAt: Date;
  user: UserObject;
}
