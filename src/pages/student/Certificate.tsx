import { useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useQuizStore } from '../../store/useQuizStore';
import { useCourseStore } from '../../store/useCourseStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Download, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import gsap from 'gsap';

export default function Certificate() {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { attempts, quizzes } = useQuizStore();
    const { courses } = useCourseStore();

    const attempt = attempts.find(a => a.id === attemptId);
    const quiz = quizzes.find(q => q.id === attempt?.quizId);
    const course = courses.find(c => c.id === quiz?.courseId);

    const certRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // Reveal animation
        const ctx = gsap.context(() => {
            gsap.from(certRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                rotateX: -15
            });

            gsap.from(".cert-item", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.5,
                ease: "back.out(1.7)"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!attempt || !quiz || !user) return <div className="p-8">Certificate not found</div>;

    const handleDownload = async () => {
        if (!certRef.current) return;
        const canvas = await html2canvas(certRef.current, { scale: 2 });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `WStudy_Certificate_${user.name.replace(/\s+/g, '_')}.png`;
        link.click();
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 py-8 perspective-1000">
            <div className="flex items-center gap-4 w-full max-w-4xl px-4">
                <Button variant="ghost" onClick={() => navigate('/student/courses')}>
                    <ArrowLeft size={20} className="mr-2" /> Back
                </Button>
                <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold">Your Certificate</h1>
                </div>
                <Button onClick={handleDownload} className="bg-brand text-white">
                    <Download size={20} className="mr-2" /> Download
                </Button>
            </div>

            <div
                ref={certRef}
                className="w-full max-w-4xl bg-white p-12 rounded-none shadow-2xl border-8 border-double border-brand/20 text-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
                style={{ aspectRatio: '1.414/1' }} // A4 approx ratio landscape
            >
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand/10 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-success/10 rounded-tl-full"></div>

                <div className="relative z-10 flex flex-col h-full items-center justify-center space-y-8">
                    <div className="cert-item space-y-2">
                        <h2 className="text-5xl font-heading font-black text-brand tracking-widest uppercase">Certificate</h2>
                        <p className="text-xl text-gray-400 font-serif italic">of completion</p>
                    </div>

                    <div className="cert-item w-full py-8 border-b-2 border-gray-100">
                        <p className="text-lg text-gray-500 mb-2">This is to certify that</p>
                        <h1 className="text-4xl font-bold text-accent font-serif mb-2">{user.name}</h1>
                        <p className="text-lg text-gray-500">has successfully passed the assessment</p>
                    </div>

                    <div className="cert-item space-y-4">
                        <h3 className="text-3xl font-bold text-brand">{quiz.title}</h3>
                        <p className="text-gray-600">Course: {course?.title || 'WStudy Course'}</p>
                    </div>

                    <div className="cert-item flex items-center justify-center gap-12 mt-8 pt-8 w-full max-w-2xl">
                        <div className="text-center">
                            <div className="w-40 border-b border-gray-400 mb-2"></div>
                            <p className="text-sm font-bold text-gray-400 uppercase">Date</p>
                            <p className="font-mono">{new Date(attempt.timestamp).toLocaleDateString()}</p>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-brand/30 flex items-center justify-center p-2 opacity-50">
                            <div className="text-center rotate-[-15deg]">
                                <p className="text-[10px] font-bold uppercase text-brand">WStudy</p>
                                <p className="text-xs font-black text-success">VERIFIED</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-40 border-b border-gray-400 mb-2"></div>
                            <p className="text-sm font-bold text-gray-400 uppercase">Instructor</p>
                            <p className="font-serif italic text-lg">WStudy Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
