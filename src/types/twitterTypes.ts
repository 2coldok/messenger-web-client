export interface ITweet {
  id: string;
  text: string;
  username: string;
  name: string;
  url?: string;
}

export interface ITweetService {
  getTweets(username?: string): Promise<ITweet[]>;
  postTweet(text: string): Promise<ITweet>;
  deleteTweet(tweetId: string): Promise<void>;
  updateTweet(tweetId: string, text: string): Promise<ITweet>;
}

export interface ITweetServiceProp {
  tweetService: ITweetService;
}
