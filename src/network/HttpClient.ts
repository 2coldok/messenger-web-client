import { IAuthErrorEventBus } from "../context/AuthContext";

interface IOptions  {
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

export interface IHttpClient {
  fetch<T>(url: string, options: IOptions): Promise<T>;
}

class HttpClient implements IHttpClient {
  constructor(private baseURL: string, private authErrorEventBus: IAuthErrorEventBus) {}

  async fetch<T>(url: string, options: IOptions): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    // body check : 현재 DELETE 요청시 서버에서 응답처리 안함. 
    // body가 비어있어서 해당 요청에대한 처리 추가하기
    // 비어있는 body를 파싱할 시 에러 발생됨(SyntaxError: Unexpected end of JSON input)
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.log('body가 비어있음(DELETE 요청은 body가 비어있음)');
    }

    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : '서버에서 message 처리하지 않은 오류';
      const error = new Error(message);

      if (response.status === 401) {
        this.authErrorEventBus.notify(error);
      }
      
      throw error;
    }
    
    return data;
  }
}

export default HttpClient;
