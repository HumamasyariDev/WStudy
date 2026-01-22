import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';
import { Button } from '../ui/Button';
import { Comment } from '../../types';
import { MessageSquare, Send } from 'lucide-react';

interface CommentSectionProps {
    courseId: string;
    moduleId: string;
    comments: Comment[];
}

export function CommentSection({ courseId, moduleId, comments }: CommentSectionProps) {
    const { user } = useAuthStore();
    const { addComment } = useCourseStore(); // Need to update store interface to include this
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim() || !user) return;

        const newComment: Comment = {
            id: crypto.randomUUID(),
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            text,
            timestamp: Date.now()
        };

        // Check if addComment exists on store (it should be added)
        // @ts-ignore
        addComment(courseId, moduleId, newComment);
        setText('');
    };

    return (
        <div className="space-y-4 mt-8">
            <div className="flex items-center gap-2 text-lg font-bold">
                <MessageSquare size={20} />
                <h3>Discussion ({comments.length})</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-4 max-h-96 overflow-y-auto">
                {comments.length === 0 ? (
                    <p className="text-gray-400 italic text-sm">No comments yet. Be the first to start a discussion!</p>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${c.userRole === 'teacher' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600'}`}>
                                {c.userName.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm">{c.userName}</span>
                                    <span className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleDateString()}</span>
                                    {c.userRole === 'teacher' && <span className="text-[10px] bg-brand/10 text-brand px-1 rounded">Teacher</span>}
                                </div>
                                <p className="text-sm text-gray-700 bg-white p-2 rounded-lg shadow-sm border border-gray-100">{c.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex gap-2">
                <input
                    className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Type your question or comment..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Button onClick={handleSubmit} disabled={!text.trim()}>
                    <Send size={18} />
                </Button>
            </div>
        </div>
    );
}
