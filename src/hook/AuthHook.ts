import { useContext } from "react";
import AuthContext, { IAuthContext } from "../context/AuthContext";

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 훅은 AuthProvider 범위 안에서 사용해야 됩니다.');
  }
  return context;
}
