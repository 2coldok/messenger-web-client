interface IOptions  {
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

class HttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetch(url: string, options: IOptions) {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    // body check
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }

    if (response.status > 299 || response.status < 200) {
      
      const message = data && data.message ? data.message : '모르는 오류';
      throw new Error(message);
    }
    
    return data;
  }

}

export default HttpClient;