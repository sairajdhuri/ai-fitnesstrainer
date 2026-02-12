'use client';

/**
 * VisibilityWarning — Dark theme.
 */
import { Eye } from 'lucide-react';

export default function VisibilityWarning() {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            style={{ background: 'rgba(29, 24, 21, 0.85)', backdropFilter: 'blur(8px)' }}>
            <div className="text-center animate-breathe">
                <Eye className="w-12 h-12 mx-auto mb-5 text-taupe" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl font-semibold text-white mb-2">
                    Step back
                </h2>
                <p className="text-gray-500 text-sm max-w-[240px] mx-auto leading-relaxed">
                    Your full body needs to be visible in the frame.
                </p>
            </div>
        </div>
    );
}
