"use client"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import router from "next/router";
import { createContext, ReactNode, useState, useEffect, useContext } from "react";

type User = {
  id: string;
  email: string;
  token?: string;
};

interface UserContextProps {
  children: ReactNode;
}

export const UserContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (val: any) => void;
  checkLocalStorage: () => string | null;
} | null>(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null); 

  const router = useRouter();
  const pathname = usePathname();

  const checkLocalStorage = () => {
    const token = localStorage.getItem('jwt');
    return token;
  };

  const fetchUser = async () => {
    try {
      const token = checkLocalStorage();

      if (!token) {
        if (pathname !== '/login' && pathname !== '/register') {
          router.push('/login');
          return;
        }
      }
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

      const response = await fetch(`${BASE_URL}/api/user/me`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); 
        localStorage.setItem('loggedIn', "true");

        if (pathname == '/login' || pathname == '/register') {
          router.push('/');
        } else {
          router.push(pathname);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  


  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await fetch('your-token-verification-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        return false;
      }
    };

    const token = checkLocalStorage();

    if (token) {
      const isTokenValid = verifyToken(token);

      if (!isTokenValid) {
        setUser(null);
        localStorage.removeItem('jwt');
        router.push('/login');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    console.log(userData, 'userData+++');

    localStorage.setItem('jwt', userData.token || '');
    router.push('/home');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    // router.push('/login');
  };
  const updateUser = (val: any) => {
    setUser(val)
    
  }
  return (
    <UserContext.Provider value={{ user, login, logout, checkLocalStorage, updateUser }}>

      {children}
    </UserContext.Provider >
  );
};

