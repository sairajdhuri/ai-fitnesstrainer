'use client';

/**
 * ExerciseSelector: a grid of exercise cards shown before a session starts.
 */
import { ArrowDownUp, ArrowDown, Dumbbell, Zap } from 'lucide-react';
import { EXERCISE_LIST } from '../engine/exercises';
import useSessionStore from '../store/sessionStore';

const ICON_MAP = {
    ArrowDownUp,
    ArrowDown,
    Dumbbell,
    Zap,
};

export default function ExerciseSelector() {
    const selectExercise = useSessionStore((s) => s.selectExercise);
    const isEngineReady = useSessionStore((s) => s.isEngineReady);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900/80 backdrop-blur-sm z-30">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in">
                <h1 className="font-heading text-4xl md:text-5xl font-black text-white text-glow mb-3">
                    AI Fitness Trainer
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-md">
                    Real-time form correction powered by computer vision. Select an exercise to begin.
                </p>
                {!isEngineReady && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-electric-400 text-sm">
                        <div className="w-4 h-4 border-2 border-electric-400 border-t-transparent rounded-full animate-spin" />
                        Loading pose engine...
                    </div>
                )}
            </div>

            {/* Exercise grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 max-w-3xl w-full">
                {EXERCISE_LIST.map((ex, i) => {
                    const Icon = ICON_MAP[ex.icon] || Zap;
                    return (
                        <button
                            key={ex.id}
                            disabled={!isEngineReady}
                            onClick={() => selectExercise(ex)}
                            className="group glass p-6 flex flex-col items-center gap-3 cursor-pointer
                         hover:glow-blue hover:border-electric-500/40 transition-all duration-300
                         disabled:opacity-40 disabled:cursor-not-allowed
                         animate-fade-in pointer-events-auto"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-electric-500/15 flex items-center justify-center
                              group-hover:bg-electric-500/25 transition-colors duration-300">
                                <Icon className="w-7 h-7 text-electric-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-heading font-bold text-white text-sm group-hover:text-glow transition-all">
                                    {ex.name}
                                </h3>
                                <p className="text-gray-500 text-xs mt-1">{ex.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
