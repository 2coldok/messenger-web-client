import { ITweet } from "../types/twitterTypes";
import HttpClient from "../network/HttpClient";
class TweetService {
  http: HttpClient;
  
  constructor(http: HttpClient) {
    this.http = http;
  }
  
  // username은 선택적 파라미터
  async getTweets(username?: string): Promise<ITweet[]> {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text: string): Promise<ITweet> {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({ text, username: 'cat', name: 'Hyang'}),
    });
  }

  async deleteTweet(tweetId: string): Promise<void> {
    this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(tweetId: string, text: string): Promise<ITweet>{
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',  
      body: JSON.stringify({ text })
    });
  }
}

export default TweetService;
