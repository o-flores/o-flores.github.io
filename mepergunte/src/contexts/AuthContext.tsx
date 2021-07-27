import { auth, firebase } from '../services/firebase';
import { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();

  // usando o array vazio a função dentro do useEffect vai ser disparada apenas uma vez quando o componente for montado
  useEffect(() => {

    //O metodo onAuthStateChanged retorna um firebase.Unsubscribe que é a função q retira o listener
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
  
  
        if (!displayName || !photoURL) {
          throw new Error('Mising information from Google Account');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    //retornar o metodo do firebase.unsubscribe para retirar o evento na hora da desmontagem
    return () => {
      unsubscribe();
    }
  }, []);
  
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    const result = await auth.signInWithPopup(provider)
  
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
  
  
      if (!displayName || !photoURL) {
        throw new Error('Mising information from Google Account');
      }
  
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}
