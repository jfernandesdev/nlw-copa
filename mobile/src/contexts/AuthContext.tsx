import { createContext, ReactNode } from 'react';

interface UserProps {
  name: string;
  avatarUrl?: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  
  async function signIn() {
    console.log('Sign in function')
  }

  return(
    <AuthContext.Provider value={{ 
      signIn, 
      user: {
        name: 'Jeferson Fernandes',
        avatarUrl: 'https://github.com/jfernandesdev.png'
      }
      }}>
        {children}
    </AuthContext.Provider>
  )
}