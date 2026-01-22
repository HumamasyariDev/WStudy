import { create } from 'zustand'
import { Quiz, QuizAttempt } from '../types'
import { db } from '../lib/db'

interface QuizState {
    quizzes: Quiz[];
    attempts: QuizAttempt[];
    fetchQuizzes: () => void;
    fetchAttempts: () => void;
    saveQuiz: (quiz: Quiz) => void;
    saveAttempt: (attempt: QuizAttempt) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    quizzes: [],
    attempts: [],
    fetchQuizzes: () => {
        const quizzes = db.getQuizzes();
        set({ quizzes });
    },
    fetchAttempts: () => {
        const attempts = db.getAttempts();
        set({ attempts });
    },
    saveQuiz: (quiz) => {
        db.saveQuiz(quiz);
        set((state) => ({ quizzes: [...state.quizzes, quiz] }));
    },
    saveAttempt: (attempt) => {
        db.saveAttempt(attempt);
        set((state) => ({ attempts: [...state.attempts, attempt] }));
    }
}))
