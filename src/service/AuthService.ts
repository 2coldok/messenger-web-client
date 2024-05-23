import { IHttpClient } from "../network/HttpClient";
import { ITokenStorage } from "../db/token";

interface IUserData {
  token: string;
  username: string;
}

interface IAuthService {
  signup(username: string, password: string, name: string, email: string, url: string): Promise<IUserData>;
  login(username: string, password: string): Promise<IUserData>;
  me(): Promise<IUserData>;
  logout(): void;
}

export default class AuthService implements IAuthService {
  constructor(private http: IHttpClient, private tokenStorage: ITokenStorage) {}

  async signup(username: string, password: string, name: string, email: string, url: string) {
    const data = await this.http.fetch<IUserData>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      })
    });

    this.tokenStorage.saveToken(data.token)

    return data;
  }

  async login(username: string, password: string) {
    const data = await this.http.fetch<IUserData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    this.tokenStorage.saveToken(data.token);

    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    
    return this.http.fetch<IUserData>('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
