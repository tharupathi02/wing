import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  createdAt: string;
}

interface UserState {
  // State
  currentUser: User | null;
  registeredUsers: User[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
      // Initial State
      currentUser: null,
      registeredUsers: [],
      isAuthenticated: false,
      loading: false,
      error: null,

      // Sign Up
      signUp: async (name: string, email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          // Validate input
          if (!name || !email || !password) {
            set({ loading: false, error: 'All fields are required' });
            return { success: false, message: 'All fields are required' };
          }

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            set({ loading: false, error: 'Invalid email format' });
            return { success: false, message: 'Invalid email format' };
          }

          // Check if user already exists
          const { registeredUsers } = get();
          const userExists = registeredUsers.some(
            (user) => user.email.toLowerCase() === email.toLowerCase()
          );

          if (userExists) {
            set({ loading: false, error: 'Email already registered' });
            return { success: false, message: 'Email already registered' };
          }

          // Create new user
          const newUser: User = {
            id: Date.now().toString(),
            name,
            email: email.toLowerCase(),
            password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
          };

          // Add to registered users
          set({
            registeredUsers: [...registeredUsers, newUser],
            loading: false,
            error: null,
          });

          return { success: true, message: 'Sign up successful! Please sign in.' };
        } catch (error: any) {
          set({ loading: false, error: error.message });
          return { success: false, message: error.message || 'Sign up failed' };
        }
      },

      // Sign In
      signIn: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          // Validate input
          if (!email || !password) {
            set({ loading: false, error: 'Email and password are required' });
            return { success: false, message: 'Email and password are required' };
          }

          // Find user
          const { registeredUsers } = get();
          const user = registeredUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );

          if (!user) {
            set({ loading: false, error: 'Invalid email or password' });
            return { success: false, message: 'Invalid email or password' };
          }

          // Set current user and authenticate
          set({
            currentUser: user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true, message: 'Sign in successful!' };
        } catch (error: any) {
          set({ loading: false, error: error.message });
          return { success: false, message: error.message || 'Sign in failed' };
        }
      },

      // Logout
      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
        });
      },
}));
