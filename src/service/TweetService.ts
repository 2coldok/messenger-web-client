import { ITweet } from "../types/twitterTypes";

class TweetService {
  baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  // username은 선택적 파라미터
  async getTweets(username?: string): Promise<ITweet[]> {
    const query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }
    
    return data;
  }

  async postTweet(text: string): Promise<ITweet> {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, username: 'cat', name: 'Hyang'}),
    });
    const data = await response.json();

    if (response.status !== 201) {
      throw new Error('POST 오류용');
    } 

    return data;
  }

  async deleteTweet(tweetId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.status !== 204) {
      throw new Error('DELETE 오류용');
    } 
  }

  async updateTweet(tweetId: string, text: string): Promise<ITweet>{
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}

export default TweetService;
