import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'teacher' | 'student';

interface User {
    id: string;
    name: string;
    role: UserRole;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (role) => {
                const mockUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: role === 'student' ? 'Alex Student' : role === 'teacher' ? 'Prof. Sarah' : 'Admin User',
                    role: role,
                    avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${role}`,
                };
                set({ user: mockUser, isAuthenticated: true });
            },
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'wstudy-auth',
        }
    )
);
