import { IHttpClient } from "../network/HttpClient";

// export interface ITweet {
//   id: string;
//   text: string;
//   username: string;
//   name: string;
//   url?: string;
// }

export interface ITweet {
  tweetId: string;
  text: string;
  createdAt: string;
  userId: string;

  username: string;
  name: string;
  url: string;
}

export interface ITweetService {
  getTweets(username?: string): Promise<ITweet[]>;
  postTweet(text: string): Promise<ITweet>;
  deleteTweet(tweetId: string): Promise<void>;
  updateTweet(tweetId: string, text: string): Promise<ITweet>;
}

class TweetService implements ITweetService {
  constructor(private http: IHttpClient) {}
  
  // username은 선택적 파라미터
  async getTweets(username?: string): Promise<ITweet[]> {
    const query = username ? `?username=${username}` : '';
    
    return this.http.fetch<ITweet[]>(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text: string): Promise<ITweet> {
    return this.http.fetch<ITweet>(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({ text, username: 'cat', name: 'Hyang'}),
    });
  }

  async deleteTweet(tweetId: string): Promise<void> {
    this.http.fetch<void>(`/tweets/${tweetId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(tweetId: string, text: string): Promise<ITweet> {
    return this.http.fetch<ITweet>(`/tweets/${tweetId}`, {
      method: 'PUT',  
      body: JSON.stringify({ text })
    });
  }
}

export default TweetService;
