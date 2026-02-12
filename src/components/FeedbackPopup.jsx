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
        warning: { border: '#c9a857', bg: 'rgba(201,168,87,0.08)', text: '#c9a857' },
        info: { border: '#bd8965', bg: 'rgba(189,137,101,0.08)', text: '#C0AF9E' },
        success: { border: '#7d9b76', bg: 'rgba(125,155,118,0.08)', text: '#7d9b76' },
    };
    const a = accents[feedback.severity] || accents.info;

    return (
        <div
            className={`px-5 py-3.5 mb-2.5 ${exiting ? 'animate-slide-out' : 'animate-slide-in'}`}
            style={{
                borderRadius: '16px',
                borderLeft: `3px solid ${a.border}`,
                background: a.bg,
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(255,255,255,0.05)`,
                borderLeftWidth: '3px',
                borderLeftColor: a.border,
            }}
        >
            <p className="text-sm font-medium" style={{ color: a.text }}>{feedback.message}</p>
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
        <div className="absolute top-16 right-6 w-64 pointer-events-none z-20">
            {displayed.map(f => (
                <Toast key={`${f.id}-${f.timestamp}`} feedback={f}
                    onExpire={() => setDisplayed(p => p.filter(x => x.id !== f.id))} />
            ))}
        </div>
    );
}
