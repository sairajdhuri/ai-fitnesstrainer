/**
 * Dashboard — Japandi light mode.
 * Hero with warm clay accent, all Japandi colors visible across
 * stat cards and exercise grid. Inspired by Spur.fit layout + CoreFit typography.
 */
import { Play, Eye, Flame, Clock, Trophy, ArrowDownUp, ArrowDown, Dumbbell, Zap, Sparkles } from 'lucide-react';
import { EXERCISE_LIST } from '../engine/exercises';
import useSessionStore from '../store/sessionStore';

const ICON_MAP = { ArrowDownUp, ArrowDown, Dumbbell, Zap };

// Each stat uses a different Japandi palette color
const STATS = [
    { label: 'Weekly Streak', value: '—', icon: Flame, accent: '#AC6A47', bg: 'rgba(172,106,71,0.08)' },
    { label: 'Time Active', value: '0m', icon: Clock, accent: '#6D674B', bg: 'rgba(109,103,75,0.08)' },
    { label: 'Form Score', value: '—', icon: Trophy, accent: '#B98869', bg: 'rgba(185,136,105,0.08)' },
];

export default function Dashboard({ onStartWorkout }) {
    const isEngineReady = useSessionStore((s) => s.isEngineReady);

    return (
        <div className="flex-1 h-full overflow-y-auto p-8 lg:p-10" style={{ background: '#f5f2ed' }}>
            {/* Top */}
            <div className="flex items-center justify-between mb-10">
                <div>
                    <p className="text-text-muted text-xs tracking-[0.15em] uppercase mb-1">Welcome back</p>
                    <h2 className="font-heading text-3xl font-semibold text-text-primary">Dashboard</h2>
                </div>
                {!isEngineReady && (
                    <div className="flex items-center gap-2 text-soft text-xs px-4 py-2 rounded-xl border border-border-light"
                        style={{ background: 'rgba(172,106,71,0.04)' }}>
                        <div className="w-3 h-3 border border-soft border-t-transparent rounded-full animate-spin" />
                        Loading AI…
                    </div>
                )}
            </div>

            {/* Hero — big serif header, Spur.fit style clean layout */}
            <div className="glass relative overflow-hidden p-9 lg:p-12 mb-8 animate-fade-up shadow-soft"
                style={{ background: 'linear-gradient(145deg, rgba(172,106,71,0.05) 0%, rgba(255,255,255,0.85) 60%)' }}>

                {/* Color accent bar — shows terracotta, olive, sand at the top */}
                <div className="absolute top-0 left-0 right-0 h-1 flex">
                    <div className="flex-1" style={{ background: '#AC6A47' }} />
                    <div className="flex-1" style={{ background: '#B98869' }} />
                    <div className="flex-1" style={{ background: '#6D674B' }} />
                    <div className="flex-1" style={{ background: '#AAA082' }} />
                    <div className="flex-1" style={{ background: '#C0AF9E' }} />
                    <div className="flex-1" style={{ background: '#767267' }} />
                    <div className="flex-1" style={{ background: '#C4BBAA' }} />
                    <div className="flex-1" style={{ background: '#C3BDB1' }} />
                </div>

                <div className="relative z-10 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold
                           uppercase tracking-[0.2em] mb-6 border border-border-light"
                        style={{ background: 'rgba(172,106,71,0.06)', color: '#AC6A47' }}>
                        <Sparkles className="w-3 h-3" />
                        AI Powered
                    </span>

                    <h3 className="font-heading text-4xl lg:text-5xl font-semibold text-text-primary leading-[1.15] mb-2">
                        Your posture,
                    </h3>
                    <h3 className="font-heading text-4xl lg:text-5xl font-semibold leading-[1.15] mb-6"
                        style={{ color: '#AC6A47' }}>
                        perfected.
                    </h3>

                    <p className="text-text-secondary text-sm max-w-md mb-9 leading-[1.7]">
                        Real-time movement analysis to prevent injury and elevate your form.
                        Minimal. Precise. Intentional.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onStartWorkout}
                            disabled={!isEngineReady}
                            className="flex items-center gap-2.5 px-7 py-3 rounded-2xl font-body font-semibold text-sm
                         text-white transition-all duration-300 cursor-pointer
                         disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.97]"
                            style={{ background: '#AC6A47', boxShadow: '0 4px 16px rgba(172,106,71,0.25)' }}
                        >
                            <Play className="w-4 h-4" fill="currentColor" />
                            Begin Session
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-sm text-text-secondary
                               border border-border-med hover:border-shady hover:text-text-primary
                               transition-all cursor-pointer">
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                            Tutorial
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats — each card uses a different Japandi color */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {STATS.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label}
                            className="p-5 flex items-center gap-4 rounded-2xl border border-border-light shadow-warm animate-fade-up"
                            style={{ animationDelay: `${0.15 + i * 0.08}s`, background: '#ffffff' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: stat.bg }}>
                                <Icon className="w-4 h-4" style={{ color: stat.accent }} strokeWidth={1.8} />
                            </div>
                            <div>
                                <p className="text-[11px] text-text-muted uppercase tracking-wider">{stat.label}</p>
                                <p className="text-lg font-heading font-semibold text-text-primary">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Exercise cards — each card border-bottom uses its Japandi color */}
            <div className="mb-6">
                <h4 className="font-heading text-xl font-semibold text-text-primary mb-5">Choose Exercise</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {EXERCISE_LIST.map((ex, i) => {
                        const Icon = ICON_MAP[ex.icon] || Zap;
                        return (
                            <button
                                key={ex.id}
                                disabled={!isEngineReady}
                                onClick={() => {
                                    useSessionStore.getState().selectExercise(ex);
                                    onStartWorkout();
                                }}
                                className="group p-5 flex flex-col items-center gap-3.5 cursor-pointer
                           disabled:opacity-25 disabled:cursor-not-allowed
                           animate-fade-up pointer-events-auto
                           rounded-2xl border border-border-light shadow-warm
                           hover:shadow-soft transition-all duration-300"
                                style={{
                                    animationDelay: `${0.3 + i * 0.06}s`,
                                    background: '#ffffff',
                                    borderBottom: `2px solid ${ex.color}`,
                                }}
                            >
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                    style={{ background: `${ex.color}12` }}>
                                    <Icon className="w-5 h-5" style={{ color: ex.color }} strokeWidth={1.8} />
                                </div>
                                <div className="text-center">
                                    <h5 className="font-heading font-semibold text-text-primary text-sm">{ex.name}</h5>
                                    <p className="text-text-muted text-[10px] mt-0.5">{ex.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
