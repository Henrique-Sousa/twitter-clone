export interface UserResult {
  id: number;
  name: string
  username: string;
  createdAt: string;
}

export interface TweetResult {
  id: number;
  text: string;
  createdAt: string;
  user: UserResult;
}
