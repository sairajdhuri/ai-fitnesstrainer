/**
 * LandingPage — Faithfully converted from user's provided HTML.
 * Dark Japandi hero with Playfair Display serif, glass nav, social proof,
 * trainer image, floating stat card, and exercise picker overlay.
 */
import { useState } from 'react';
import { ArrowDownUp, ArrowDown, Dumbbell, Zap, X } from 'lucide-react';
import { EXERCISE_LIST } from '../engine/exercises';
import useSessionStore from '../store/sessionStore';

const ICON_MAP = { ArrowDownUp, ArrowDown, Dumbbell, Zap };

const AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKBtYBQ0aPbOWT0W-B83cgv4FF1bARkNmdlKpxlh2PMdDz8cgQSwUjetXYiRPapg7il22HZ2z6K3vJD2L4EqNo4Ur3U0uI-aKAd27KCdGDp0gdQnrrmKo90P72yXuAXOz3mCrk_k6ZgKcbS_4j22MSpkAU36_LDZMF4JwjDV61_VArHF8Rw5Y0RX5sIhAkXMUKDpsqUn5cvY6yT10ca2UqjdMTXvU5ynoyLWDgdg9bMgYkeATsutEWAS6Zhw6Fg1dnbqzs7PaE5A',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBe46unMtTFd9Gh9dDOpNvjX4NZ1kXxX1AQYUULbg9abVXSbZnYUmAC_zuK96Xc6VOA8JGMbeqUBTMKHUGfBvw4uL_Xgf8H5WHPZfNeTIBlWVqoX62UghCrZ0Y2d2t1tcMn5Tnnt8GBznGU49eIRWmVDPsPNCDeuI_fNlClpcyUcNaN2m2GDbOzrkw3IU5nA4iFyqdxpGz5XhFl5PUoaYiz4tfKwu_EdY_XNJiYSZl3793YAlMrmGQZlN4cllLxPbnVvv1NpBpxHg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNO2JaykiMclWlhbdox3zitYb3KlgR0dGH6xWLC2Wty1B4uUEzQ-ziT0usmRrfQXEdNaaYM1CZUInPhFMXQ_2syvl1KNhY156PL9vtse3zDxntRXBUnAyaAo9l-bsmEbG_GV2nJqAEDt4gvNoObjqKS4l9smObCLh0qUUx-pn9j148UxNI_g-XTfcfffM0iPY81RhglHGPKrB9uRpW2eHLhUE-CXRWiRtnbhSPRXLyxoSwAz_OOxApAakmfxlnBwsyr6msOsxYHQ',
];

const TRAINER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTMyceAdeRrK_UgzHO3G4NTsBUh2Nx4wgIJKmoGDRlVWwWmpTRBRT-A-pKv48FEv8oZ6UY3nu1vK0bDfatgSF58aPAQ1PWmzXBOegr2FLSizMqlN1P1EmyDIp8me_s9vCFKC5hteymmoWnKK9504lF9jBPLAF8e5Ff7ZpPG5ROqake1_TBvVweR2CVYqYoqXZAHnnEFgD7fhMIcy-QbaF1hj2hrBnq7lW2uqIr1lWQDraM0ZwGa4u7mJTG6kQZ-0hDDr9B9F2ojw';

/* ── Exercise Picker Overlay ── */
function ExercisePicker({ onSelect, onClose }) {
    const isEngineReady = useSessionStore((s) => s.isEngineReady);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ background: 'rgba(29,24,21,0.92)', backdropFilter: 'blur(12px)' }}>
            <div className="relative w-full max-w-lg px-6">
                <button onClick={onClose}
                    className="absolute -top-14 right-6 w-10 h-10 rounded-full flex items-center justify-center
                     cursor-pointer transition-all hover:bg-white/10 border border-white/10">
                    <X className="w-4 h-4 text-gray-400" strokeWidth={1.8} />
                </button>

                <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-3">Select exercise</p>
                <h2 className="font-serif text-3xl font-semibold text-white mb-8">
                    What are we working on?
                </h2>

                {!isEngineReady && (
                    <div className="flex items-center gap-2 text-primary text-xs mb-6">
                        <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                        Loading AI engine…
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {EXERCISE_LIST.map((ex, i) => {
                        const Icon = ICON_MAP[ex.icon] || Zap;
                        return (
                            <button
                                key={ex.id}
                                disabled={!isEngineReady}
                                onClick={() => onSelect(ex)}
                                className="group p-6 flex flex-col items-start gap-3 cursor-pointer
                           disabled:opacity-25 disabled:cursor-not-allowed
                           rounded-2xl transition-all duration-300
                           hover:border-primary/30 active:scale-[0.98] text-left animate-fade-up glass-card"
                                style={{ animationDelay: `${i * 0.06}s`, borderBottom: `2px solid ${ex.color}` }}
                            >
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{ background: `${ex.color}18` }}>
                                    <Icon className="w-5 h-5" style={{ color: ex.color }} strokeWidth={1.8} />
                                </div>
                                <div>
                                    <h5 className="font-serif font-semibold text-white text-[15px]">{ex.name}</h5>
                                    <p className="text-gray-500 text-[11px] mt-0.5">{ex.description}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ── Landing Page ── */
export default function LandingPage({ onStartWorkout }) {
    const [showPicker, setShowPicker] = useState(false);

    const handleSelect = (exercise) => {
        useSessionStore.getState().selectExercise(exercise);
        setShowPicker(false);
        onStartWorkout();
    };

    return (
        <div className="w-full h-full overflow-y-auto" style={{ background: '#1d1815', color: 'white' }}>

            {/* ── Nav ── */}
            <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, padding: '28px 80px' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="bg-primary" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <span className="material-icons-round" style={{ fontSize: 18 }}>spa</span>
                        </div>
                        <span className="font-serif" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '0.04em', color: 'white' }}>FitVision</span>
                    </div>

                    {/* Nav links in glass pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '12px 32px', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Workouts</a>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Recommendations</a>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: '#d1d5db', textDecoration: 'none' }}>Pricing</a>
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <a href="#" style={{ fontSize: 14, fontWeight: 500, color: 'white', textDecoration: 'none' }}>Log in</a>
                        <button
                            onClick={() => setShowPicker(true)}
                            style={{ padding: '10px 24px', borderRadius: 9999, background: 'white', color: '#1d1815', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <header className="hero-bg" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                {/* Grain */}
                <div className="grain" style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }} />

                <div style={{
                    width: '100%', maxWidth: 1400, margin: '0 auto',
                    padding: '160px 80px 80px 80px',
                    position: 'relative', zIndex: 10,
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
                    alignItems: 'center', minHeight: '100vh',
                }}>

                    {/* Left content */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
                        {/* Badge */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', borderRadius: 9999, border: '1px solid rgba(189,137,101,0.3)', background: 'rgba(189,137,101,0.1)', width: 'fit-content', marginBottom: 40 }}>
                            <span className="bg-primary" style={{ width: 8, height: 8, borderRadius: '50%', display: 'block' }} />
                            <span className="text-primary" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>For Conscious Trainers</span>
                        </div>

                        {/* Heading */}
                        <h1 className="font-serif" style={{ lineHeight: 1.1, marginBottom: 40, color: 'white', fontSize: 'clamp(48px, 5vw, 72px)' }}>
                            Your AI <br />
                            <span className="text-primary" style={{ fontStyle: 'italic', fontWeight: 300 }}>Fitness Coach</span> <br />
                            Perfect Your Form. <br />
                            Maximize Results
                        </h1>

                        {/* Subtitle */}
                        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 56, maxWidth: 460, fontWeight: 300, lineHeight: 1.8 }}>
                            An all-in-one workout platform for people who value peace of mind as much as performance—get real-time form feedback that keeps you safe, confident, and progressing every session
                        </p>

                        {/* CTA */}
                        <div style={{ marginBottom: 64 }}>
                            <button
                                onClick={() => setShowPicker(true)}
                                className="btn-glow"
                                style={{
                                    padding: '16px 48px', borderRadius: 9999,
                                    background: '#bd8965', color: 'white',
                                    fontSize: 15, fontWeight: 500,
                                    border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    transition: 'all 0.3s',
                                }}
                            >
                                Start Training
                                <span className="material-icons-round" style={{ fontSize: 16 }}>arrow_forward</span>
                            </button>
                        </div>

                        {/* Social proof */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ display: 'flex' }}>
                                {AVATARS.map((src, i) => (
                                    <img key={i} src={src} alt="User"
                                        style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #C4BBAA', objectFit: 'cover', marginLeft: i > 0 ? -12 : 0 }} />
                                ))}
                                <div className="bg-primary" style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #C4BBAA', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginLeft: -12 }}>
                                    2k+
                                </div>
                            </div>
                            <div>
                                <div className="text-primary" style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-icons-round" style={{ fontSize: 16 }}>star</span>
                                    ))}
                                </div>
                                <p style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Trusted by mindful coaches</p>
                            </div>
                        </div>
                    </div>

                    {/* Right — trainer image */}
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: 480, zIndex: 10 }}>
                            {/* Glow */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', borderRadius: '50%', filter: 'blur(48px)', zIndex: -1, border: '1px solid rgba(189,137,101,0.2)', background: 'rgba(189,137,101,0.05)' }} />
                            {/* Image */}
                            <img
                                src={TRAINER_IMG}
                                alt="Fitness trainer"
                                style={{ position: 'relative', zIndex: 10, objectFit: 'contain', width: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))', maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                            />
                            {/* Floating stat card */}
                            <div style={{ position: 'absolute', top: '25%', left: -48, zIndex: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                    <div className="glass-card" style={{ padding: '12px 20px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                                        <div className="text-primary" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(189,137,101,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span className="material-icons-round">favorite</span>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Retention</p>
                                            <p style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>98%</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.3)' }} />
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 128, zIndex: 10, background: 'linear-gradient(to top, #1d1815, transparent)' }} />
            </header>

            {/* ── Exercise Picker ── */}
            {showPicker && (
                <ExercisePicker onSelect={handleSelect} onClose={() => setShowPicker(false)} />
            )}
        </div>
    );
}
