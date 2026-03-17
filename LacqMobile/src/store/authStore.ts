// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================
// Kurulum (terminal'de):
// npm install zustand @react-native-async-storage/async-storage
// ============================================================

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Client' | 'Specialist' | 'Admin';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const API_URL = 'http://localhost:5106/api'; // Geliştirme ortamı
// iOS Simulator için: http://localhost:5001
// Android Emulator için: http://10.0.2.2:5001
// Fiziksel cihaz için: bilgisayarının IP adresi (ör. http://192.168.1.x:5001)

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Giriş başarısız');
          }

          set({
  user: {
    id: data.userId,
    email: email,
    firstName: '',
    lastName: '',
    role: data.role === 0 ? 'Client' : data.role === 1 ? 'Specialist' : 'Admin',
  },
  token: data.token,
  isAuthenticated: true,
  isLoading: false,
});
        } catch (error: any) {
          set({
            error: error.message || 'Bir hata oluştu',
            isLoading: false,
          });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.message || 'Kayıt başarısız');
          }

          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Bir hata oluştu',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'lacq-auth',
      storage: createJSONStorage(() => AsyncStorage),
      // Sadece bu field'ları persist et
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);