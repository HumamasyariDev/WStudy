import { create } from 'zustand'
import { Course } from '../types'
import { db } from '../lib/db'

interface CourseState {
    courses: Course[];
    fetchCourses: () => void;
    addCourse: (course: Course) => void;
    addComment: (courseId: string, moduleId: string, comment: any) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
    courses: [],
    fetchCourses: () => {
        const courses = db.getCourses();
        set({ courses });
    },
    addCourse: (course) => {
        db.saveCourse(course);
        set((state) => ({ courses: [...state.courses, course] }));
    },
    addComment: (courseId, materialId, comment) => {
        const courses = db.getCourses();
        const courseIndex = courses.findIndex(c => c.id === courseId);

        if (courseIndex > -1) {
            // Find material across all modules
            for (let mIndex = 0; mIndex < courses[courseIndex].modules.length; mIndex++) {
                const materialIndex = courses[courseIndex].modules[mIndex].materials.findIndex(mat => mat.id === materialId);

                if (materialIndex > -1) {
                    courses[courseIndex].modules[mIndex].materials[materialIndex].comments.push(comment);
                    db.saveCourse(courses[courseIndex]);
                    set({ courses });
                    return;
                }
            }
        }
    }
}))
