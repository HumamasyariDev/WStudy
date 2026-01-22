import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOptionIndex: number;
    weight: number;
}

export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
    totalWeight: number; // Must be 100
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    modules: {
        id: string;
        title: string;
        type: 'video' | 'pdf' | 'text';
        content: string; // URL or text
    }[];
    quizzes: Quiz[];
}

export interface StudentProgress {
    userId: string;
    courseId: string;
    progress: number; // 0-100
    quizScores: Record<string, number>; // quizId -> score
    completed: boolean;
    certificateId?: string;
}

interface DataState {
    courses: Course[];
    progress: Record<string, StudentProgress[]>; // courseId -> progress[]
    addCourse: (course: Course) => void;
    updateCourse: (courseId: string, updates: Partial<Course>) => void;
    deleteCourse: (courseId: string) => void;
    updateProgress: (userId: string, courseId: string, progress: number) => void;
    saveQuizScore: (userId: string, courseId: string, quizId: string, score: number) => void;
}

const INITIAL_COURSES: Course[] = [
    {
        id: 'c1',
        title: 'React Development',
        description: 'Master React.js from scratch.',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        modules: [],
        quizzes: [
            {
                id: 'q1',
                title: 'React Hooks',
                totalWeight: 100,
                questions: [
                    { id: '1', text: 'What hook is used for side effects?', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctOptionIndex: 1, weight: 50 },
                    { id: '2', text: 'What hook is used for state?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], correctOptionIndex: 1, weight: 50 }
                ]
            }
        ]
    },
    {
        id: 'c2',
        title: 'UI/UX Design Principles',
        description: 'Learn to design beautiful interfaces.',
        thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=800&q=80',
        modules: [],
        quizzes: []
    }
];

export const useDataStore = create<DataState>()(
    persist(
        (set) => ({
            courses: INITIAL_COURSES,
            progress: {},
            addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
            updateCourse: (id, updates) => set((state) => ({
                courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
            })),
            deleteCourse: (id) => set((state) => ({ courses: state.courses.filter((c) => c.id !== id) })),
            updateProgress: (userId, courseId, progress) => set((state) => {
                const currentProgress = state.progress[courseId] || [];
                const userProgressIndex = currentProgress.findIndex(p => p.userId === userId && p.courseId === courseId);

                if (userProgressIndex > -1) {
                    const newProgress = [...currentProgress];
                    newProgress[userProgressIndex] = { ...newProgress[userProgressIndex], progress };
                    return { progress: { ...state.progress, [courseId]: newProgress } };
                } else {
                    return { progress: { ...state.progress, [courseId]: [...currentProgress, { userId, courseId, progress, quizScores: {}, completed: false }] } };
                }
            }),
            saveQuizScore: (userId, courseId, quizId, score) => set((state) => {
                // Logic to update score and check if course completed
                const currentProgressList = state.progress[courseId] || [];
                const userPIndex = currentProgressList.findIndex(p => p.userId === userId);

                if (userPIndex > -1) {
                    const newPList = [...currentProgressList];
                    newPList[userPIndex].quizScores[quizId] = score;
                    // Simple logic: if all quizzes passed, mark complete? For now just save score.
                    return { progress: { ...state.progress, [courseId]: newPList } };
                }
                return state;
            })
        }),
        {
            name: 'wstudy-data',
        }
    )
);
