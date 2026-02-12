'use client';

/**
 * Sidebar — Japandi light mode.
 * Clean vertical nav on warm linen-like bg.
 */
import { LayoutDashboard, Dumbbell, Activity, Settings, Leaf } from 'lucide-react';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workout', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeView, onNavigate }) {
    return (
        <aside className="w-[220px] h-full flex flex-col shrink-0 border-r border-border-light"
            style={{ background: '#faf8f5' }}>
            {/* Brand */}
            <div className="px-6 py-7 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center swatch-soft">
                    <Leaf className="w-4 h-4 text-soft" strokeWidth={1.8} />
                </div>
                <h1 className="font-heading text-xl font-semibold text-text-primary leading-none tracking-wide">
                    FitVision
                </h1>
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-border-light" />

            {/* Nav */}
            <nav className="flex-1 px-3 mt-5 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium
                transition-all duration-200 cursor-pointer
                ${isActive
                                    ? 'nav-active text-soft'
                                    : 'text-text-muted hover:text-text-primary hover:bg-border-light'
                                }`}
                        >
                            <Icon className="w-[16px] h-[16px]" strokeWidth={1.8} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Status */}
            <div className="px-4 pb-5">
                <div className="px-4 py-3 flex items-center gap-2.5 rounded-xl border border-border-light"
                    style={{ background: 'rgba(237, 232, 224, 0.5)' }}>
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-success" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-success animate-ping opacity-40" />
                    </div>
                    <span className="text-[11px] text-text-muted font-medium">Engine ready</span>
                </div>
            </div>
        </aside>
    );
}
