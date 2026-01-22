export type Role = 'admin' | 'teacher' | 'student';

export interface User {
    id: string;
    name: string;
    role: Role;
    avatar?: string;
    email: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    modules: Module[]; // Represents Chapters
    teacherId: string;
    studentsEnrolled: string[]; // User IDs
}

export interface Module {
    id: string;
    title: string; // Chapter Title
    materials: Material[];
}

export interface Material {
    id: string;
    title: string;
    type: 'video' | 'text' | 'file' | 'quiz';
    content: string; // URL, text, or QuizID
    comments: Comment[];
}

export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userRole: Role;
    text: string;
    timestamp: number;
}

export interface Quiz {
    id: string;
    courseId: string;
    title: string;
    questions: Question[];
    passingScore: number; // e.g. 70
}

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOptionIndex: number;
    weight: number; // Points for this question
}

export interface QuizAttempt {
    id: string;
    quizId: string;
    studentId: string;
    score: number;
    passed: boolean;
    timestamp: number;
    answers: Record<string, number>; // QuestionID -> OptionIndex
}
