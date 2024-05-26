import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ authService, children }) {
  const [user, setUser] = useState(undefined);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService.signUp(username, password, name, email, url)
      .then((user) => setUser(user)),
    [authService]  
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then((user) => setUser(user)),
    [authService]  
  );

  const logOut = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
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
export const useAuth = () => useContext(AuthContext);
