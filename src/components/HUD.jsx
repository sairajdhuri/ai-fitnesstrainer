'use client';

/**
 * HUD — Dark theme for workout view.
 * Large elegant rep counter bottom-left, glass-card styling.
 */
import { useEffect, useState } from 'react';
import useSessionStore from '../store/sessionStore';

function RomArc({ angle, minAngle, maxAngle }) {
    const range = maxAngle - minAngle;
    const clamped = Math.max(minAngle, Math.min(maxAngle, angle || minAngle));
    const progress = range > 0 ? (clamped - minAngle) / range : 0;
    const r = 30, circ = 2 * Math.PI * r;
    const dashOff = circ * (1 - progress);
    const color = progress > 0.7 ? '#7d9b76' : progress > 0.4 ? '#c9a857' : '#bd8965';

    return (
        <svg width="76" height="76" viewBox="0 0 76 76">
            <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="3"
                strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dashOff}
                className="rom-arc" transform="rotate(-90 38 38)" style={{ opacity: 0.8 }} />
            <text x="38" y="42" textAnchor="middle" fill="white" fontSize="13" fontWeight="500"
                fontFamily="Inter">{Math.round(angle || 0)}°</text>
        </svg>
    );
}

export default function HUD() {
    const { exercise, phase, repCount, currentAngles } = useSessionStore();
    const [pulseKey, setPulseKey] = useState(0);

    useEffect(() => { if (repCount > 0) setPulseKey(k => k + 1); }, [repCount]);
    if (!exercise) return null;

    const primaryAngle = currentAngles[exercise.primaryJoint] || 0;
    const isDown = phase === 'down';
    const pc = exercise.phases;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Exercise label */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <div className="glass-card px-5 py-2 rounded-full flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-medium text-gray-300 tracking-[0.15em] uppercase">
                        {exercise.name}
                    </span>
                    <span className="text-[10px] text-gray-500 tracking-widest uppercase">
                        {phase === 'idle' ? '—' : phase}
                    </span>
                </div>
            </div>

            {/* Rep counter — bottom-left */}
            <div className="absolute bottom-8 left-8">
                <div className="glass-card px-7 py-5 rounded-2xl flex items-center gap-5 shadow-xl">
                    <div className="text-center">
                        <div key={pulseKey} className="font-serif text-6xl font-semibold text-white animate-pulse-gentle"
                            style={{ lineHeight: 1 }}>
                            {repCount}
                        </div>
                        <div className="text-[9px] text-gray-500 font-medium uppercase tracking-[0.25em] mt-2">
                            repetitions
                        </div>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <RomArc
                        angle={primaryAngle}
                        minAngle={isDown ? pc.down.min : pc.up.min}
                        maxAngle={isDown ? pc.down.max : pc.up.max}
                    />
                </div>
            </div>
        </div>
    );
}
