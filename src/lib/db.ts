import { User, Course, Quiz, QuizAttempt } from '../types';

const STORAGE_KEYS = {
    USERS: 'wstudy_users',
    COURSES: 'wstudy_courses',
    QUIZZES: 'wstudy_quizzes',
    ATTEMPTS: 'wstudy_attempts',
};

// Initial Mock Data
const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Admin User', role: 'admin', email: 'admin@wstudy.com' },
    { id: 'u2', name: 'Teacher One', role: 'teacher', email: 'teacher@wstudy.com' },
    { id: 'u3', name: 'Student One', role: 'student', email: 'student@wstudy.com' },
];

const MOCK_COURSES: Course[] = [
    {
        id: 'c1',
        title: 'Introduction to Web Design',
        description: 'Learn the basics of UI/UX and modern web aesthetics.',
        teacherId: 'u2',
        studentsEnrolled: ['u3'],
        modules: [
            {
                id: 'm1',
                title: 'Chapter 1: Getting Started',
                materials: [
                    {
                        id: 'mat1',
                        title: 'Welcome to the Course',
                        type: 'text',
                        content: 'Welcome to the course! Here we start.',
                        comments: []
                    }
                ]
            }
        ],
        thumbnail: 'https://images.unsplash.com/photo-1541462608143-df3376251b6a?auto=format&fit=crop&q=80&w=1000'
    }
];

export const db = {
    getUsers: (): User[] => {
        const data = localStorage.getItem(STORAGE_KEYS.USERS);
        if (!data) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
            return MOCK_USERS;
        }
        return JSON.parse(data);
    },

    getCourses: (): Course[] => {
        const data = localStorage.getItem(STORAGE_KEYS.COURSES);
        if (!data) {
            localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(MOCK_COURSES));
            return MOCK_COURSES;
        }
        return JSON.parse(data);
    },

    saveCourse: (course: Course) => {
        const courses = db.getCourses();
        const index = courses.findIndex(c => c.id === course.id);
        if (index >= 0) {
            courses[index] = course;
        } else {
            courses.push(course);
        }
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    },

    getQuizzes: (): Quiz[] => {
        const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
        return data ? JSON.parse(data) : [];
    },

    saveQuiz: (quiz: Quiz) => {
        const quizzes = db.getQuizzes();
        const index = quizzes.findIndex(q => q.id === quiz.id);
        if (index >= 0) {
            quizzes[index] = quiz;
        } else {
            quizzes.push(quiz);
        }
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    },

    getAttempts: (): QuizAttempt[] => {
        const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
        return data ? JSON.parse(data) : [];
    },

    saveAttempt: (attempt: QuizAttempt) => {
        const attempts = db.getAttempts();
        attempts.push(attempt);
        localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
    }
};
