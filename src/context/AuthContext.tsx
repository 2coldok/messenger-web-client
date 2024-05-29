import { 
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { IAuthService } from '../service/AuthService';
import Login from '../pages/Login';

interface IUser {
  token: string;
  username: string;
}

// To AuthHook.ts
export interface IAuthContext {
  user: IUser | undefined;
  signUp: (username: string, password: string, name: string, email: string, url: string) => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

interface IAuthProvider {
  authService: IAuthService;
  children: ReactNode;
  authErrorEventBus: IAuthErrorEventBus;
}

// To AuthHook.ts
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children, authErrorEventBus }: IAuthProvider) {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    authErrorEventBus.listen((error: Error) => {
      console.log(`인증 에러 + status 401 + authErrorEventBus callback 함수 발동 : ${error}`);
      setUser(undefined);
    })
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then((user) => setUser(user)).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username: string, password: string, name: string, email: string, url: string) =>
      authService.signUp(username, password, name, email, url)
      .then((user) => setUser(user))
      .catch((error) => console.log(error)),
    [authService]  
  );

  const logIn = useCallback(
    async (username: string, password: string) =>
      authService.logIn(username, password).then((user) => setUser(user)).catch((error) => console.log(error)),
    [authService]  
  );

  const logOut = useCallback(
    async () => {
      // 일단 await(서버 처리 기능 추가 고려해서)
      await authService.logOut();
      setUser(undefined);
    },
    [authService]
  );

  const context = useMemo(() => ({
    user,
    signUp,
    logIn,
    logOut,
  }), [user, signUp, logIn, logOut]);

  return (
    <AuthContext.Provider value={context}>
      {user ? children : <Login />}
    </AuthContext.Provider>
  )
}

export type ErrorCallback = (error: Error) => void;
export interface IAuthErrorEventBus {
  listen(callback: ErrorCallback): void;
  notify(error: Error): void;
}
export class AuthErrorEventBus implements IAuthErrorEventBus  {
  #callback?: ErrorCallback;

  listen(callback: ErrorCallback) {
    this.#callback = callback;
  }

  notify(error: Error) {
    if (this.#callback) {
      this.#callback(error);
    }
  }
}

export default AuthContext;
