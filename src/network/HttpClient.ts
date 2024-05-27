interface IOptions  {
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

export interface IHttpClient {
  fetch<T>(url: string, options: IOptions): Promise<T>;
}

class HttpClient implements IHttpClient {
  constructor(private baseURL: string) {}

  async fetch<T>(url: string, options: IOptions): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    // body check -> delete은 body 없으니 해당 요청에대한 처리 추가하기
    let data;
    
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : null;
      // data = await response.json();
    } catch (error) {
      console.error(error);
      data = null;
    }

    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : '모르는 오류';
      console.log('HttpClient.ts : status code 가 200번대가 아님');
      
      throw new Error(message); 
    }
    
    return data;
  }
}

export default HttpClient;
