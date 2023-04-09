import { createContext, useContext, useEffect, useState } from 'react';
import { LogIn, LogOut, ObserveAuthChange } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    ObserveAuthChange((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, LogIn, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
