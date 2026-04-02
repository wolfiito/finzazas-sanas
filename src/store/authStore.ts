import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: localStorage.getItem('hf_token'),
      user: null,
      isAuthenticated: !!localStorage.getItem('hf_token'),
      setAuth: (token, user) => {
        localStorage.setItem('hf_token', token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem('hf_token');
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'hf-auth-storage',
    }
  )
);
