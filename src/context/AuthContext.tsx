import { 
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { IAuthService } from '../service/AuthService';

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
}

// To AuthHook.ts
export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ authService, children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | undefined>(undefined);

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
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
