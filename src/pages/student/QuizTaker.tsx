import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/useQuizStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { QuizAttempt } from '../../types';

export default function QuizTaker() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { quizzes, saveAttempt } = useQuizStore();

    const quiz = quizzes.find(q => q.id === quizId);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [passed, setPassed] = useState(false);
    const [attemptId, setAttemptId] = useState('');

    if (!quiz) return <div className="p-8">Quiz not found</div>;

    const currentQuestion = quiz.questions[currentQIndex];
    const totalWeight = quiz.questions.reduce((sum, q) => sum + (Number(q.weight) || 0), 0);

    const handleOptionSelect = (optionIndex: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
    };

    const handleNext = () => {
        if (currentQIndex < quiz.questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        let earnedPoints = 0;
        quiz.questions.forEach(q => {
            const selected = answers[q.id];
            if (selected === q.correctOptionIndex) {
                earnedPoints += Number(q.weight);
            }
        });

        // Calculate percentage score: (earned / total possible weight) * 100
        // If totalWeight is 0 (edge case), score is 0.
        const finalScore = totalWeight > 0 ? Math.round((earnedPoints / totalWeight) * 100) : 0;

        const isPassed = finalScore >= quiz.passingScore;

        const newAttemptId = crypto.randomUUID();
        const attempt: QuizAttempt = {
            id: newAttemptId,
            quizId: quiz.id,
            studentId: user?.id || 'guest',
            score: finalScore,
            passed: isPassed,
            timestamp: Date.now(),
            answers
        };

        saveAttempt(attempt);
        setScore(finalScore);
        setPassed(isPassed);
        setAttemptId(newAttemptId);
        setIsFinished(true);
    };

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className={`p-6 rounded-full ${passed ? 'bg-success/10 text-success' : 'bg-red-100 text-red-500'}`}>
                    {passed ? <CheckCircle size={64} /> : <AlertCircle size={64} />}
                </div>
                <h2 className="text-3xl font-bold">{passed ? 'Congratulations!' : 'Keep Trying!'}</h2>
                <p className="text-xl text-gray-500">
                    You scored <span className="font-bold text-brand">{score}%</span>
                </p>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/student')}>Back to Courses</Button>
                    {passed && (
                        <Button onClick={() => navigate(`/student/certificate/${attemptId}`)}>
                            Get Certificate
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{quiz.title}</h2>
                <span className="text-gray-400 font-medium">Question {currentQIndex + 1} of {quiz.questions.length}</span>
            </div>

            <div className="relative h-96">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <Card className="p-8 h-full flex flex-col justify-between shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-medium leading-relaxed">{currentQuestion.text}</h3>
                                    <span className="text-xs font-bold bg-brand/10 text-brand px-2 py-1 rounded-full whitespace-nowrap">
                                        {currentQuestion.weight} Pts
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {currentQuestion.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[currentQuestion.id] === idx
                                                ? 'border-brand bg-brand/5 text-brand font-bold shadow-sm'
                                                : 'border-gray-100 hover:border-brand/30 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="mr-3 inline-block w-6 h-6 rounded-full border border-current text-center text-xs leading-5">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 mt-4 border-t border-gray-50">
                                <Button
                                    onClick={handleNext}
                                    disabled={answers[currentQuestion.id] === undefined}
                                >
                                    {currentQIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
