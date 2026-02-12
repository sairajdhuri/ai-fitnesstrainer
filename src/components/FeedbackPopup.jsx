'use client';

/**
 * FeedbackPopup — Dark-theme toasts matching the landing design.
 */
import { useEffect, useState } from 'react';
import useSessionStore from '../store/sessionStore';

function Toast({ feedback, onExpire }) {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => { setExiting(true); setTimeout(() => onExpire(feedback.id), 350); }, 2800);
        return () => clearTimeout(t);
    }, [feedback.id, onExpire]);

    const accents = {
        warning: { border: '#ff4444', bg: 'rgba(0,0,0,0.95)', text: '#ff4444' }, // Red for corrections
        info: { border: '#ffffff', bg: 'rgba(0,0,0,0.95)', text: '#ffffff' },
        success: { border: '#44ff44', bg: 'rgba(0,0,0,0.95)', text: '#44ff44' }, // Green for correct
    };
    const a = accents[feedback.severity] || accents.info;

    return (
        <div
            className={`px-6 py-5 mb-4 ${exiting ? 'animate-slide-out' : 'animate-slide-in'}`}
            style={{
                borderRadius: '20px',
                borderLeft: `6px solid ${a.border}`,
                background: a.bg,
                backdropFilter: 'blur(16px)',
                border: `1px solid rgba(255,255,255,0.1)`,
                borderLeftWidth: '6px',
                borderLeftColor: a.border,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
        >
            <p className="text-3xl font-bold tracking-wide" style={{ color: a.text, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {feedback.message}
            </p>
        </div>
    );
}

export default function FeedbackPopup() {
    const feedbackQueue = useSessionStore((s) => s.feedbackQueue);
    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        if (feedbackQueue.length > 0) {
            const latest = feedbackQueue[feedbackQueue.length - 1];
            setDisplayed(prev => {
                if (prev.find(f => f.id === latest.id && f.timestamp === latest.timestamp)) return prev;
                return [...prev.slice(-2), latest];
            });
        }
    }, [feedbackQueue]);

    return (
        <div className="absolute top-20 right-8 w-96 pointer-events-none z-50">
            {displayed.map(f => (
                <Toast key={`${f.id}-${f.timestamp}`} feedback={f}
                    onExpire={() => setDisplayed(p => p.filter(x => x.id !== f.id))} />
            ))}
        </div>
    );
}
