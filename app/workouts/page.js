'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dumbbell, Activity, Heart, Shuffle, Sun, Zap } from 'lucide-react';
import { WORKOUT_LIBRARY } from './data';
import '../../src/index.css';

const CATEGORY_ICONS = {
    'Strength': Dumbbell,
    'Cardio': Heart,
    'HIIT': Zap,
    'Core': Activity,
    'Mobility': Sun,
    'Balance': Shuffle,
    'Pilates': Activity
};

const CATEGORY_COLORS = {
    'Strength': '#B98869', // Terracotta
    'Cardio': '#AC6A47',   // Soft Clay
    'HIIT': '#AC6A47',     // Soft Clay (shared)
    'Core': '#6D674B',     // Olive
    'Mobility': '#AAA082', // Sand
    'Balance': '#C0AF9E',  // Taupe
    'Pilates': '#767267'   // Shady
};

const DIFFICULTY_COLORS = {
    'Beginner': '#7d9b76',      // Sage Green (Success/Easy)
    'Intermediate': '#c9a857',  // Mustard/Gold (Warning/Medium)
    'Advanced': '#b85c5c'       // Red/Terracotta (Error/Hard)
};

// Algorithm to shuffle but try to separate categories
const getDistributedWorkouts = () => {
    // Deterministic shuffle seed or just random (client side)
    // Simple random shuffle first
    let pool = [...WORKOUT_LIBRARY].sort(() => Math.random() - 0.5);

    // Simple heuristic: if two adjacent have same category, try to swap with next
    for (let i = 0; i < pool.length - 1; i++) {
        if (pool[i].category === pool[i + 1].category) {
            // Find next non-matching
            for (let j = i + 2; j < pool.length; j++) {
                if (pool[j].category !== pool[i].category) {
                    [pool[i + 1], pool[j]] = [pool[j], pool[i + 1]];
                    break;
                }
            }
        }
    }
    return pool;
};

// Use state to ensure hydration consistency if we used random
// But for simplicity in this demo, we'll just use the function directly 
// or arguably better: use memo to prevent reshuffle on re-render
// Since this is a server component turned client, let's use a standard shuffle.
// However, to avoid hydration mismatch, we should ideally do this in useEffect
// OR just rely on the fact that it's a client component.

// Let's do it in a useMemo.

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        setWorkouts(getDistributedWorkouts());
    }, []);

    // If empty (first render), show library or loader. 
    // To avoid flash, we can default to library but it won't be shuffled.
    const displayList = workouts.length > 0 ? workouts : WORKOUT_LIBRARY;

    return (
        <div className="w-full min-h-screen text-white relative" style={{ background: '#1d1815' }}>
            {/* ── Background Image ── */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                backgroundImage: 'url("/design inspo/japandi.png")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(8px) brightness(0.4)',
                transform: 'scale(1.05)' // Scale up slightly to hide blur edges
            }} />

            {/* ── Nav ── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 80px',
                background: 'rgba(29, 24, 21, 0.4)', backdropFilter: 'blur(16px)', // More transparent
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <img src="/logo.png" alt="FitVision logo" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                        <span className="font-serif" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '0.04em', color: 'white' }}>FitVision</span>
                    </Link>

                    {/* Nav links in glass pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '12px 32px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
                        <Link href="/" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Home</Link>
                        <Link href="/workouts" style={{ fontSize: 14, fontWeight: 500, color: 'white', textDecoration: 'none' }}>Workouts</Link>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Recommendations</a>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Pricing</a>
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: 'white', textDecoration: 'none' }}>Log in</a>
                        <button
                            style={{ padding: '10px 24px', borderRadius: 9999, background: 'white', color: '#1d1815', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Grain */}
            <div className="grain" style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', zIndex: 1 }} />

            <div className="relative z-10 w-full mx-auto px-6 md:px-20 pt-48 pb-24">
                <header className="mb-16 text-center">
                    <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Full Library</p>
                    <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Explore Movement</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
                    {displayList.map((ex) => {
                        const Icon = CATEGORY_ICONS[ex.category] || Activity;
                        const themeColor = CATEGORY_COLORS[ex.category] || '#C4BBAA';

                        return (
                            <div
                                key={ex.id}
                                className="group relative p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${themeColor}20`,
                                    backdropFilter: 'blur(10px)',
                                    cursor: 'default'
                                }}
                            >
                                <div className="flex flex-col items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                                        style={{ background: `${themeColor}20`, color: themeColor }}>
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 px-3 py-1.5 rounded-full border border-white/10 bg-black/20 whitespace-nowrap">
                                        {ex.duration}
                                    </span>
                                </div>

                                <h3 className="font-serif text-2xl mb-2 text-white opacity-90">{ex.name}</h3>
                                <p className="text-xs font-medium tracking-wide uppercase mb-6" style={{ color: themeColor }}>{ex.category}</p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    <span className="text-[11px] px-3 py-1.5 rounded-md border whitespace-nowrap font-medium"
                                        style={{
                                            borderColor: `${DIFFICULTY_COLORS[ex.difficulty] || '#9ca3af'}40`,
                                            backgroundColor: `${DIFFICULTY_COLORS[ex.difficulty] || '#9ca3af'}15`,
                                            color: DIFFICULTY_COLORS[ex.difficulty] || '#9ca3af'
                                        }}>
                                        {ex.difficulty}
                                    </span>
                                    {ex.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[11px] px-3 py-1.5 rounded-md bg-white/5 text-gray-400 border border-white/5 whitespace-nowrap">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
