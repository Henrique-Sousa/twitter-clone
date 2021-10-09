import { TweetResult } from '../lib/ApiResult';

const fetchJSON = async (url: string): Promise<Array<TweetResult>> => {
  const response = await fetch(url, { mode: 'cors' });
  const result = await response.json();
  return result;
}

export default fetchJSON;
